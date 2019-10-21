const { connectionURL } = require('../config.json')
const mongoose = require('mongoose');
const color = require('colors');

class Database {
    static connect() {
        try {
            mongoose.connect(connectionURL, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            });
            console.log(`Sucessfully connected to Database`.green)
        } catch(e) {
            console.error(`Unable to connecto to database: ${e}`)
        }
    }
}

module.exports = Database;