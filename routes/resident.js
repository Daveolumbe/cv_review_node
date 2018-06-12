const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Resident = require('../models/resident-model');
const UserEmergency = require('../models/emergency-model');

// Resident Section
router.get('/homeowners', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Resident.getAllEstateAppUser({EstateId: req.user.UniqueId}, (err, allUsers) => {
        if (err) throw err;
        if (!allUsers) {
            return res.json({ success: false, msg: 'No User registered yet' });
        }
        // res.json({ user: req.user });
        return res.json({  success: true, home: allUsers});
    });
});

router.get('/emergency', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    UserEmergency.getAllEmergency({EstateId: req.user.UniqueId}, (err, allEmergencies) => {
        if (err) throw err;
        if (!allEmergencies) {
            return res.json({ success: false, msg: 'No User registered yet' });
        }
        return res.json({  success: true, emergencies: allEmergencies});
    });
});

// Update
router.post('/updatehomeowner', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Resident.updateUserRecord({_id: req.body._id}, req.body, (err, result) => {
        if (result.n) return res.json({success: false, error: 'PROBLEM ACTIVATING'});
        return res.json({success: true, result: req.body.FirstName + ' USER DETAILS UPDATED SUCCESSFULLY'});
    });
});


router.post('/emeupdate', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const newUpdate = {Status: req.body.Status};
    UserEmergency.updateUserEmeergency({_id: req.body._id}, newUpdate, (err, result) => {
        if (result.n) return res.json({success: false, error: 'PROBLEM UPDATING RECORD'});
        return res.json({success: true, result: ' SUCCESSFUL'});
    });
});

//delete
router.post('/deleteone', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Resident.deleteOne({_id: req.body._id}, (err) => {
        if (err) return res.json({success: false, error: 'BAD REQUEST MATE'});
        return res.json({success: true, result: req.body.FirstName + ' DELETED SUCCESSFULLY'});
    });
});

//activate
router.post('/activate', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const activate = {Active: 1, MyRandomNumber: 0};
    Resident.activateUser({_id: req.body.id, EstateId: req.user.UniqueId, MyRandomNumber: req.body.MyRandomNumber}, activate, (err, result) => {
        if (result.n === 0) return res.json({success: false, error: 'PROBLEM ACTIVATING'});
        return res.json({success: true, result: 'USER ACCOUNT ACTIVATED'});
    });
});

router.get('/count', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Resident.countHomeOwners({EstateId: req.user.UniqueId}, (err, count) => {
        if (err) throw err;
        // res.json({ user: req.user });
        return res.json({  success: true, count: count});
    });
});

module.exports = router;
