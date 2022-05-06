const User = require("../../model/user");

module.exports.editUser = (req, res) => {
    const { name, email } = req.body;
    if (!(name && email)) {
        res.status(400).send("All inputs are required");
    }

}
module.exports.addTempratureEntry = async (req, res) => {
    const { entry, email } = req.body;
    if (!(entry && email)) {
        res.status(400).send("All inputs are required");
    }
    const user = await User.existingUser(email);
    if (user) {
        const result = await User.editUser({ field: 'entries', email: email, fieldValue: [...user.entries, entry] })
        return result;
    }

}