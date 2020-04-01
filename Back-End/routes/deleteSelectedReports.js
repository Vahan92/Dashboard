const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

router.patch('/:_id', async (req, res) => {
	const user = await User.updateOne({ "_id": ObjectId(req.params._id) }, { $pull: { reports: { name: { $in: req.body.names } } } });
	if (!user) {
		return res.status(404).send(req.body);
	}
	return res.status(200).send(user);
});

module.exports = router;