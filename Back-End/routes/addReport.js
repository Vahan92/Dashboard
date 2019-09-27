const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.patch('/:_id', async (req, res) => {

    const { error } = validate(req.body.report);
    console.log(`req.body ----`, req.body)
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // const user = await User.update({"_id" :req.param._id })

    const user = await User.aggregate([
        { $addFields: req.body }
    ]);
    console.log(`user ----`, user)

    if (!user) {
        return res.status(404).send(req.body);
    }
    return res.status(200).send(user);
});

function validate(req) {
    const schema = {
        name: Joi.string().min(3).max(255).required(),
        description: Joi.string().min(10).max(255).required(),
        estimation: Joi.number().min(1).required(),
        spent: Joi.number().min(1).required()

    };

    return Joi.validate(req, schema);
}

module.exports = router;