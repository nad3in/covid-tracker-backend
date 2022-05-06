const users = require('../../model/user')
module.exports.getUsersLocations = async (req, res) => {
    const result = await users.getUsersLocations();
    return result;
}