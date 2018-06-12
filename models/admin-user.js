const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const AdminUserSchema = mongoose.Schema({
    FirstName: {type: String},
    LastName: {type: String},
    UserName: {type: String},
    Password: {type: String},
    Role: {type: Number},
    UniqueId: {type: String},
    Email: {type: String}
});


const AdminUser = module.exports = mongoose.model('AdminUser', AdminUserSchema);

module.exports.getAdminById = function(id, callback) {
    AdminUser.findById(id, callback);
};

module.exports.getAdmin = function(query, callback) {
    AdminUser.findOne(query, callback);
};

module.exports.getAllAdmin = function(estateId, callback) {
    AdminUser.find(estateId, callback);
};


module.exports.addAdminUser = function(newUser, callback) {
    // gen salt
    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.Password, salt, (error, hash) => {
            if (error) throw error;
            newUser.Password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    })
};