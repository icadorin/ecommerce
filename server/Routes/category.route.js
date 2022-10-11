express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const categoryById = require('../middleware/categoryById');
const { check, validationResult } = require('express-validator');

// @route POST api/category
// @desc  Create category
// @acess Private Admin
router.post('/', [
    check('name', 'Name is required').trim().not().isEmpty()
], auth, adminAuth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        });
    }
    const { name } = req.body
    try {
        let category = await Category.findOne({ name });

        if (category) {
            return res.status(403).json({
                error: 'Category already exist'
            });
        }
        const newCategory = new Category({ name });
        category = await newCategory.save();
        res.json(category);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

// @route GET api/category/all
// @desc  Get all category
// @acess Public
router.get('/all', async (req, res) => {
    try {
        let data = await Category.find({})
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

// @route GET api/category/:categoryId
// @desc  Get single category
// @acess Public
router.get('/:categoryId', categoryById, async (req, res) => {
    res.json(req.category);
});

// @route PUT api/category/:categoryId
// @desc  Update single category
// @acess Private Admin
router.put('/:categoryId', auth, adminAuth, categoryById, async (req, res) => {
    let category = req.category;
    const { name } = req.body;
    if(name) category.name = name.trim()

    try {
        category = await category.save();
        res.json(category)
    } catch (error) {
        console.log(error.menssage);
        res.send(500).send('Server error');
    }
});

// @route DELETE api/category/:categoryId
// @desc  Delete single category
// @acess Private Admin
router.delete('/:categoryId', auth, adminAuth, categoryById, async (req, res) => {
    let category = req.category;
    try {
        let deleteCategory = await category.remove()
        res.json({
            message: `${deleteCategory.name} delete successfully`
        })
    } catch (error) {
        console.log(error.menssage);
        res.send(500).send('Server error');
    }
});

module.exports = router;