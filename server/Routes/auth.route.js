const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // Generate token
const bcrypt = require('bcryptjs');  // Encrypt password
// Check validation requests
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar'); // Get user image by email

// Models
const User = require('../models/User');
const auth = require('../middleware/auth')

// @route POST api/user
// @desc  User Information
// @acess Private
router.get('/', auth, async (req, res) => {
    try {
        // Get user information by id
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error')
    }
})

// @route POST api/user/register
// @desc  Register user
// @acess Public
router.post('/register', [
    // Validation
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    // Get name and email and password from request
    const { name, email, password } = req.body;

    try {
        // Check if user already exist
        let user = await User.findOne({ email });

        // If user exist
        if (user) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'User already exist',
                    },
                ],
            });
        }

        // If not exists
        // Get image from gravatar
        const avatar = gravatar.url(email, {
            s: '200',// Size
            r: 'pg', // Rate
            d: 'mm'
        });

        // Create user object
        user = new User({
            name, email, avatar, password
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10); // Generate salt constains 10
        // save password
        user.password = await bcrypt.hash(password, salt) // user password and salt to hash password
        // save user in database
        await user.save();

        // charge to generate token
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
            expiresIn: 360000 // change later 3600
        },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

// @route POST api/user/login
// @desc  Login user
// @acess Public
router.post('/login', [
    // Validation for email and password
    check('email', 'please include a valid email').isEmail(),
    check('password', 'password is required').exists()
], async (req, res) => {
    // If error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    // If everything is good
    // get email and password from request body
    const { email, password } = req.body;

    try {
        // Find user
        let user = await User.findOne({
            email
        });

        // Not found in database
        if (!user) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid credentials'
                }]
            })
        }

        // User found
        const isMatch = await bcrypt.compare(password, user.password);

        // password dont match
        if (!isMatch) {
            return res.status(400).json({
                error: [{
                    msg: 'Invalid credentials'
                }]
            })
        }

        // payload for jwt
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({
                token
            })
        }
        )
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
