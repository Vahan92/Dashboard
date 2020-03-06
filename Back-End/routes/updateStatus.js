const { User, validateReport } = require('../models/user');
const express = require('express');
const router = express.Router();

router.patch('/:_id', async (req, res) => {
    
    const { error } = validateReport(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    console.log(`req.params._id ----`, req.params._id);
    console.log(`req.body ----`, req.body);
    const user = await User.findOneAndUpdate({ _id:  req.params._id, "reports.id":  req.body.id },
        { $set: { "reports.$" : req.body } });
    if (!user) {
        return res.status(404).send(req.body);
    }
    console.log(user);
    return res.status(200).send(user);
});

module.exports = router;