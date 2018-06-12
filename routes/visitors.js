const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Visitor = require('../models/visitor-model');

router.get('/visitors', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Visitor.getAllVisitorByEstateId({EstateId: req.user.UniqueId}, (err, allVisitors) => {
        if (err) return res.json({ success: false, msg: 'No User registered yet' });
        return res.json({  success: true, visitor: allVisitors});
    });
});

router.post('/checkin', passport.authenticate('jwt', { session: false }), (req, res, next) => {
   Visitor.checkInVisitor({_id: req.body.id, AccessCode: Number(req.body.AccessCode) }, {Status: 3, AccessCode: 0, Notification: 'Checked-In'}, (err, result) => {
       if (result.n === 0) return res.json({success: false, error: 'PROBLEM CHECKING-IN '});
       return res.json({ success: true})
   });
});

router.get('/count', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Visitor.countGuest({EstateId: req.user.UniqueId}, (err, count) => {
        if (err) throw err;
        return res.json({  success: true, count: count});
    });
});

module.exports = router;
