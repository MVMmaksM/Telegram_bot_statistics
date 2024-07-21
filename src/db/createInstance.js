const config = require('../config/db.conf.js');
const knex = require("knex");

function createInstance(){
    return new knex({
        client: "sqlite3",
        connection: config,
        useNullAsDefault: true
    });
}

module.exports = createInstance;