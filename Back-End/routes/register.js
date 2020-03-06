const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateUser } = require('../models/user');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
 
router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(418).send(error.details[0].message);
    }
 
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(409).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User(_.pick(req.body, ['name', 'email', 'password', 'role']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = jwt.sign({ _id: user._id, role: user.role }, "secretkey");
        console.log(`---------`, token);
        res.header('x-auth-header', token).send(_.pick(user, ['_id', 'name', 'email']));
    }
});
 
module.exports = router;