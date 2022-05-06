const dbClient = require('../config/database').getDB

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
module.exports.getUsersLocations = async () => {
    var result = await dbClient()
        .db('covidTracker')
        .collection('covidTracker')
        .find().toArray();
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
