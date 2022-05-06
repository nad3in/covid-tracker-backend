require("dotenv").config();
const express = require("express");
const app = express();
const mongoConnect = require("./config/database").mongoConnect;

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');

    next();
});

const auth = require("./middleware/auth");
const userRepo = require("./api-routes/POST/user");
const editUserRepo = require("./api-routes/PUT/user");
const getUsersRepo = require("./api-routes/GET/user")

mongoConnect(() => {
    app.listen(process.env.PORT || 5000);
    console.log(`listing to port ${process.env.PORT}`)
})

app.post("/user", async (req, res) => {
    try {
        const user = await userRepo.AddUser(req, res)
        if (user) {
            res.status(201).json(user);
        }
    } catch (err) {
        console.log(err);
    }
});
app.post("/login", async (req, res) => {
    try {
        const user = await userRepo.Login(req, res)
        if (user) {
            res.status(200).json(user);
        }
    } catch (err) {
        console.log(err);
    }
});

app.put("/user", auth, async (req, res) => {
    try {
        const result = await editUserRepo.editUser(req, res)
        res.status(200).json(result);

    } catch (err) {
        console.log(err);
    }
});
app.put("/addtemprature", auth, async (req, res) => {
    try {
        const result = await editUserRepo.addTempratureEntry(req, res)
        res.status(200).json(result);

    } catch (err) {
        console.log(err);
    }
});
app.get("/locations", auth, async (req, res) => {
    try {
        const result = await getUsersRepo.getUsersLocations(req, res)
        res.status(200).json(result);

    } catch (err) {
        console.log(err);
    }
});
