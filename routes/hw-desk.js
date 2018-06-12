const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const UserComplaint = require('../models/hw-desks');

router.get('/complaints', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    UserComplaint.getAllUserComplaintSchemaByUniqueId({EstateId: req.user.UniqueId}, (err, comp) => {
        if (err) throw err;
        if (!comp) {
            return res.json({ success: false, msg: 'No User registered yet' });
        }
        return res.json({  success: true, complaints: comp});
    });
});

module.exports = router;