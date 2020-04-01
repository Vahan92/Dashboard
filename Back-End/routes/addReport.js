const _ = require('lodash');
const { User, validateReport } = require('../models/user');
const express = require('express');
const router = express.Router();
const uuidv1 = require('uuid/v1');

router.patch('/:_id', async (req, res) => {

  const { error } = validateReport(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const report = req.body;
  report.status = "Waiting for approval";
  report.id = uuidv1();
  const user = await User.findOneAndUpdate({ "_id": req.params._id }, { $push: { reports: { $each: [report] } } });

  if (!user) {
    return res.status(404).send(req.body);
  }
  return res.status(200).send(user);
});

module.exports = router;