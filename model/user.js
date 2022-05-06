const dbClient = require('../config/database').getDB

const fsBase = require('fs');
const fs = fsBase.promises
var currentUsers = {};
module.exports.existingUser = async (userEmail) => {
    var user = await dbClient()
        .db('covidTracker')
        .collection('covidTracker')
        .findOne({ email: userEmail })
    return user;
}
module.exports.addUser = async (userData) => {
    var user = await dbClient()
        .db('covidTracker')
        .collection('covidTracker')
        .insertOne({ ...userData });
    return user;

}
module.exports.getUsersLocations = async (userData) => {
    const maxLat = userData.lat + 0.010
    const minLat = userData.lat - 0.010
    const maxLng = userData.lng + 0.010
    const minLng = userData.lng - 0.010
    var result = [];
    await dbClient()
        .db('covidTracker')
        .collection('covidTracker')
        .find().toArray(function (err, data) {
            result.push(data);
        });
    return result;
}
module.exports.editUser = async (userData) => {
    const field = userData.field;
    var user = await dbClient()
        .db('covidTracker')
        .collection('covidTracker')
        .updateOne(
            { email: userData.email },
            { $set: { [field]: userData.fieldValue } }
        );
    return user;

}
