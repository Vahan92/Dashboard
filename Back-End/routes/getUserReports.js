const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
 
router.get('/:_id', async (req, res) => {
    console.log(`(req.params ----- `, req.params);    
    let user = await User.findById(req.params._id);
    if (!user) {
        return res.status(404).send('There is no such a user');
    }
    // user.reports.userId = user.id;
    return res.status(200).send(user.reports);
});
 
module.exports = router;