const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// VisitorSchema
const UserComplaintSchema = mongoose.Schema({
    _id: {type: Number},
    UserId: {type: Number},
    Name:  {type: String},
    Category: {type: String},
    ComplaintsOrSuggestions: {type: String},
    EstateId: {type: String},
    Status: {type: String},
    Image: {type: String}
});

const UserComplaint = module.exports = mongoose.model('ComplaintsAndSuggestionstbl', UserComplaintSchema, 'ComplaintsAndSuggestionstbl');

module.exports.getAllUserComplaintSchemaByUniqueId = function (id, callback) {
    UserComplaint.find(id, callback);
};
