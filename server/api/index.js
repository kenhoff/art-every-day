const bcrypt = require("bcrypt");
const knex = require("knex")(require("../../knexfile.js"));
const consts = require("../../consts.js");

const bodyParser = require("body-parser");

module.exports = (app) => {
	app.get("/api/me");
	app.get("/api/users");
};
