const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;

router.patch('/:_id', async (req, res) => {

    console.log(`req.body ----------------------------------------------`, req.body)
    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }

    const user = await User.updateOne({"_id" : ObjectId(req.params._id) },{ $pull: { reports: { name: req.body.name } } });
    // WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 });


    // const user = await User.aggregate([
    //     { $addFields: req.body }
    // ]);
    // await user.save();
    console.log(`user ----`, user)

    if (!user) {
        return res.status(404).send(req.body);
    }
    return res.status(200).send(user);
});

module.exports = router;