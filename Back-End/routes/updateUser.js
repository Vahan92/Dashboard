const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.patch('/:_id', async (req, res) => {
    
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findByIdAndUpdate(req.params._id, {
        $set: req.body
    });
    if (!user) {
        return res.status(404).send(req.body);
    }
    return res.status(200).send(user);
});

function validate(req) {
    const schema = {
        name: Joi.string().min(3).max(255),
        email: Joi.string().min(5).max(255).email(),
        role: Joi.string().valid("admin", "pm", "developer")
    };

    return Joi.validate(req, schema);
}

module.exports = router;