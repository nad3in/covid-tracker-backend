const User = require("../../model/user");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
module.exports.AddUser = async (req, res) => {
    const { name, email, password, } = req.body;
    if (!(name && password && email)) {
        res.status(400).send("All inputs are required");
    }
    const oldUser = await User.existingUser(email);
    if (oldUser) {
        res.status(409).send("User Already Exist. Please Login");
    }
    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.addUser({ name: name, password: encryptedPassword, email: email, entries: [] });
    if (user) {
        const token = jwt.sign(
            { _id: user.insertedId, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "3d",
            }
        );
        return { token: token };
    }
    return user;
}
module.exports.Login = async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).send("All inputs are required");
    }
    const user = await User.existingUser(email);
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
            { _id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "3d",
            }
        );
        return { name: user.name, entries: user.entries, token: token };
    }
    res.status(400).send("Invalid Credentials");
}