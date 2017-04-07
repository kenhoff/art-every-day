const bcrypt = require("bcrypt");
const consts = require("../consts.js");
const knex = require("knex")(require("../knexfile.js"));
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const session = require("express-session");

let localStrategyFields = {
	passwordField: "password",
	usernameField: "email"
};

passport.use(new LocalStrategy(localStrategyFields,
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
				let userInDatabase = users[0];
				bcrypt.compare(password, userInDatabase.password, (err, result) => {
					if (result) {
						delete userInDatabase.password;
						done(null, userInDatabase);
					} else {
						done(null, false, {
							message: "Incorrect email or password."
						});
					}
				});
			}
		}).catch((err) => {
			done(err);
		});
	}
));

passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser((id, done) => {
	knex.select("id", "email", "username").table("users").where({
		id: id
	}).then((users) => {
		done(null, users[0]);
	}).catch((error) => {
		done(error);
	});
});

module.exports = (app) => {

	app.use(session({
		resave: false,
		saveUninitialized: false,
		secret: process.env.SESSION_SECRET,
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.get("/me", (req, res) => {
		if (req.user) {
			res.send({
				user: req.user
			});
		} else {
			// we send an empty user, because a 401 throws an error on the browser
			res.send({
				user: null
			});
		}
	});

	app.post("/login", passport.authenticate("local"), (req, res) => {
		res.send(req.user);
	});

	app.get("/logout", (req, res) => {
		req.logout();
		res.redirect("/");
	});

	app.post("/create-account", (req, res) => {
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
				// Store hash in your password DB.
				knex.table("users").insert({
					email: req.body.email,
					password: hash,
					username: req.body.username,
				}).returning(["id", "email", "username"]).then((results) => {
					// "login" the created user (set up a session) and send them a success response
					let createdUser = results[0];
					req.login(createdUser, (err) => {
						if (err) {
							res.status(500).send(err);
						} else {
							res.status(201).send(createdUser);
						}
					});
				}).catch((err) => {
					res.status(500).send(err);
				});
			});
		} else {
			// send 400
			res.status(400).send();
		}
	});

};
