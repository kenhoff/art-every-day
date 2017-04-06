const bcrypt = require("bcrypt");
const consts = require("../consts.js");
const knex = require("knex")(require("../knexfile.js"));
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");


passport.use(new LocalStrategy(
	function(email, password, done) {
		knex.select().table("users").where({
			email: email
		}).then((users) => {
			if (users.length == 0) {
				// user with that username doesn't exist, but we just say that it's an invalid email or password.
				done(null, false, {
					message: "Incorrect email or password."
				});
			} else if (users.length >= 2) {
				// then we dun fucked up - shouldn't be two users with the same email in the database
				done("Two users found with the same email");
			} else {
				// compare user's password with provided one
			}
		}).catch((err) => {
			done(err);
		});
	}
));

module.exports = (app) => {

	// app.use(passport.initialize());
	// app.use(passport.session());

	app.post("/api/users", (req, res) => {
		console.log("post to create account?");
		// create a user - should this be part of the API? can you even call the API without creating a user?
		// whatever - this is probably easy to fix later.


		// verify that all the fields are present and valid
		// check that email is in fact actually an email
		let emailIsValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email);
		// console.log(`email is valid: ${emailIsValid}`);

		// check that password is > 8 characters
		let passwordIsLongEnough = (req.body.password.length >= 8);
		// console.log(`password is long enough: ${passwordIsLongEnough}`);

		// check that username is alphanumeric and not blank
		let usernameValid = /^[A-Za-z0-9]+$/.test(req.body.username);
		// console.log(`username is valid: ${usernameValid}`);

		if (emailIsValid && passwordIsLongEnough && usernameValid) {
			// create user in DB
			bcrypt.hash(req.body.password, consts.SALT_ROUNDS, function(err, hash) {
				console.log("saving", hash);
				// Store hash in your password DB.
				knex.table("users").insert({
					email: req.body.email,
					password: hash,
					username: req.body.username,
				}).returning(["id", "email", "username"]).then((users) => {
					console.log(users[0]);
					// log the new user in with req.login, and redirect them to dashboard?
					// req.login()
					res.status(201).send(users[0]);
				}).catch((err) => {
					console.log(err);
					res.status(500).send(err);
				});
			});
		} else {
			// send 400
			res.status(400).send();
		}
	});

};
