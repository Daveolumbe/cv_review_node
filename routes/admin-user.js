const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const AdminUser = require('../models/admin-user');


// register
router.post('/newuser', (req, res, next) => {

    let newUser = new AdminUser({
        UniqueId: req.body.UniqueId,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Role: req.body.Role,
        UserName: req.body.UserName,
        Password: req.body.Password
    });

    AdminUser.addAdminUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});

// Login Authentication
router.post('/authenticate', (req, res, next) => {
    const username = req.body.UserName;
    const password = req.body.Password;
    const euid = req.body.UniqueId;
    const query = { 'UserName': username, 'UniqueId': euid };

    AdminUser.getAdmin(query, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }

        AdminUser.comparePassword(password, user.Password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        FirstName: user.FirstName,
                        LastName: user.LastName,
                        Role: user.Role,
                        UserName: user.UserName,
                        Email: user.Email,
                        UniqueId: user.UniqueId,
                    }
                })
            } else {
                return res.json({ success: false, msg: 'Wrong password' })
            }
        })
    });
});

router.get('/allusers', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    AdminUser.getAllAdmin({UniqueId: req.user.UniqueId}, (err, allAdminUsers) => {
        if (err) throw err;
        if (!allAdminUsers) {
            return res.json({ success: false, msg: 'No User registered yet' });
        }
        // res.json({ user: req.user });
        return res.json({  success: true, admins: allAdminUsers});
    });
});


module.exports = router;