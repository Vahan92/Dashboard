const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

router.delete('/', async (req, res) => {
    User.findOneAndRemove({ email: req.body.email })
        .exec(function (err, user) {
            console.log(` req.body.email ---`, req.body)
            if (err) {
                return res.json({ success: false, msg: 'Cannot remove user' });
            }
            if (!user) {
                return res.status(404).json({ success: false, msg: 'User not found' });
            }
            return res.status(200).json({ success: true, msg: user });
        });

});

module.exports = router;