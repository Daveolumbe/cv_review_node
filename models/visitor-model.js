const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// VisitorSchema
const VisitorSchema = mongoose.Schema({
    _id: {type: Number},
    UserId: {type: Number},
    VisitorName: {type: String},
    Visiting: {type: String},
    Address: {type: String},
    VisitorsAddress: {type: String},
    EstateId: {type: String},
    ArrivalDate: {type: String},
    LeavingDate: {type: String},
    CarModel: {type: String},
    RegNumber: {type: String},
    Status: {type: Number},
    AccessCode: {type: Number},
    Notification: {type: String}
});

const Visitor = module.exports = mongoose.model('visitors', VisitorSchema);

module.exports.getAllVisitorByEstateId = function (id, callback) {
    Visitor.find(id, callback);
};

module.exports.checkInVisitor = function (id, reset, callback ) {
    Visitor.update(id, reset, callback);
};

module.exports.countGuest = function (id, callback) {
    Visitor.count(id, callback);
};
