const async = require("async");
const bcrypt = require("bcrypt");
const consts = require("../consts.js");
const knex = require("knex")(require("../knexfile.js"));
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const session = require("express-session");

const KnexSessionStore = require("connect-session-knex")(session);

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
		store: new KnexSessionStore({
			knex: knex
		})
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

	app.post("/login", (req, res, next) => {
		passport.authenticate("local", (err, user, info) => {
			if (err) {
				return res.status(500).send(err)
			} else if (!user) {
				res.status(400).send({
					password: ["This isn't the correct password for this email."]
				});
			} else {
				req.logIn(user, function(err) {
					if (err) {
						return next(err);
					}
					return next();
				});
			}
		})(req, res, next); // ?
	}, (req, res) => {
		res.send(req.user);
	});

	app.get("/logout", (req, res) => {
		req.logout();
		res.redirect("/");
	});

	app.post("/signup", (req, res) => {

		// check that a user does not already exist with that email
		// check that a user does not already exist with that username

		async.parallel({
			email: (cb) => {
				// test if a user exists with the given email
				let email = req.body.email;
				knex.table("users").select().where({
					email: email
				}).then((results) => {
					if (results.length > 0) {
						return cb(null, ["A user with this email already exists."]);
					} else {
						return cb(null);
					}
				});
			},
			username: (cb) => {
				// test if a user exists with the given username
				let username = req.body.username;
				knex.table("users").select().where({
					username: username
				}).then((results) => {
					if (results.length > 0) {
						return cb(null, ["This username is already taken."]);
					} else {
						return cb(null);
					}
				});
			}
		}, (err, errors) => {
			if (err) {
				// then there were big problems
				res.status(500).send(err);
			} else if (errors.email || errors.username) {
				// then there were some validation errors (non-unique email/username)
				res.status(400).send(errors);
			} else {
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
			}
		});

	});

};
