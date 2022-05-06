const users = require('../../model/user')
module.exports.getUsersLocations = async (req, res) => {
    const { currentLocation } = req.body;
    console.log(currentLocation)
    if (!(currentLocation)) {
        res.status(400).send("All inputs are required");
    }
    const result = await users.getUsersLocations(currentLocation);
    return result;
}