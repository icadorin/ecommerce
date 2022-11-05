const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const formidable = require('formidable');
const fs = require('fs');
const productById = require('../middleware/productById');

// @route POST api/product
// @desc  Create a product
// @acess Private Admin
router.post('/', auth, adminAuth, async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtension = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      });
    }

    if (!files.smallImage) {
      return res.status(400).json({
        error: 'Small image is required'
      });
    }

    if (!files.image) {
      return res.status(400).json({
        error: 'Image is required'
      });
    }

    if (files.smallImage.mimetype !== 'image/jpeg' && files.smallImage.mimetype !== 'image/jpg' && files.smallImage.mimetype !== 'image/png') {
      return res.status(400).json({
        error: 'Small image type not allowed'
      });
    }

    if (files.image.mimetype !== 'image/jpeg' && files.image.mimetype !== 'image/jpg' && files.image.mimetype !== 'image/png') {
      return res.status(400).json({
        error: 'Image type not allowed'
      });
    }

    // Check for all fields
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping
    } = fields;
    if (!name || !description || !price || !category || !quantity || !shipping) {
      return res.status(400).json({
        error: 'All fields are required'
      });
    }

    let product = new Product(fields);
    // 1MB = 1.000.000
    if (files.smallImage.size > 1000000) {
      return res.status(400).json({
        error: 'Small image should be less than 1MB in size'
      });
    }

    // 1MB = 1.000.000
    if (files.image.size > 1000000) {
      return res.status(400).json({
        error: 'Image should be less than 1MB in size'
      });
    }

    product.smallImage.data = fs.readFileSync(files.smallImage.filepath);
    product.smallImage.contentType = files.smallImage.mimetype;
    product.image.data = fs.readFileSync(files.image.filepath);
    product.image.contentType = files.image.mimetype;

    try {
      await product.save();
      res.json('Product Create Successfully');
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  });
});

// @route GET api/product/list
// @desc  Get a list of products with filter
// options filter(order = ascending(asc), descending(desc), sort by any product property like: name, price and others)
// @acess Public
router.get('/list', async (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  try {
    let products = await Product.find({})
      .select('-smallImage').select('-image').populate('category').sort([
        [sortBy, order]
      ]).limit(limit).exec();

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send('Invalid querys');
  }
});

// @route GET api/product/categories
// @desc  Get a list categories of products
// @acess Public
router.get('/categories', async (req, res) => {
  try {
    let categories = await Product.distinct('category');
    if (!categories) {
      return res.status(400).json({
        error: 'Categories not found'
      });
    }
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// @route GET api/product/search
// @desc  Get a list products by search query
// @acess Public
router.get('/search', async (req, res) => {
  const query = {};

  if (req.query.search) {
    query.name = {
      $regex: req.query.search,
      $options: 'i'
    };

    // Assign category
    if (req.query.category && req.query.category != 'All') {
      query.category = req.query.category;
    }
  }

  try {
    let products = await Product.find(query).select('-smallImage').select('-image');
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error to get products');
  }
});

// @route GET api/product/:productId
// @desc  Get a product information
// @acess Public
router.get('/:productId', productById, async (req, res) => {
  req.product.smallImage = undefined;
  req.product.image = undefined;
  return res.json(req.product);
});

// @route GET api/product/smallimage/:productId
// @desc  Get a product smallImage
// @acess Public
router.get('/smallimage/:productId', productById, async (req, res) => {
  if (req.product.smallImage.data) {
    res.set('Content-Type', req.product.smallImage.contentType);
    return res.send(req.product.smallImage.data);
  }

  res.status(400).json({
    error: 'Failed load small image'
  });
});

// @route GET api/product/image/:productId
// @desc  Get a product image
// @acess Public
router.get('/image/:productId', productById, async (req, res) => {
  if (req.product.image.data) {
    res.set('Content-Type', req.product.image.contentType);
    return res.send(req.product.image.data);
  }

  res.status(400).json({
    error: 'Failed load image'
  });
});

module.exports = router;
