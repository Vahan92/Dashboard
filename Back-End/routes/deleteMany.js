const mongoose = require('mongoose');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();

mongoose.set('useFindAndModify', false);

router.delete('/', async (req, res) => {
  User.deleteMany({ _id: { $in: req.body.ids } })
    .exec(function (err, users) {
      if (err) {
        return res.json({ success: false, msg: 'Cannot remove users' });
      }
      if (!users) {
        return res.status(404).json({ success: false, msg: 'users not found' });
      }
      return res.status(200).json({ success: true, msg: users });
    });

});

module.exports = router;