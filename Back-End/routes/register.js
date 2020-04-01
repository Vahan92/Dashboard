const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateUser, pwSchema } = require('../models/user');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(418).send(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(409).send('That user already exisits!');
  } else if (!pwSchema.validate(req.body.password)) {
    return res.status(422).send('Password must contain lowercase, uppercase, digit, symbol, no spaces and minimum length of 5');
  } else {
    user = new User(_.pick(req.body, ['name', 'email', 'password', 'role']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = jwt.sign({ _id: user._id, role: user.role }, "secretkey");
    res.header('x-auth-header', token).send(_.pick(user, ['_id', 'name', 'email']));
  }
});

module.exports = router;