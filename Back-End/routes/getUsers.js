const _ = require('lodash');
const { User, } = require('../models/user');
const express = require('express');
const router = express.Router();
 
router.get('/', async (req, res) => {
    console.log(`User`, User)
    const usersProjection = {
        password: false,
        reports: false,
        __v: false
    };
    User.find({}, usersProjection, function(err, Users){
        if (err)
            res.status(400).send('Cannot get users')
    
        if (Users) {
          res.send(Users);
        }
      });
});
 
module.exports = router;