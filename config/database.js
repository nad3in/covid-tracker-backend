require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const mongoConnect = function (callback) {

    MongoClient.connect(process.env.DATABASE_CONNECTION_STRING, function (err, database) {
        if (err) throw err;

        _db = database;
        callback();
    });
}

const getDB = () => {
    if (_db) {
        return _db;
    } else {
        throw new Error('DB connect failed');
    }
}
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;