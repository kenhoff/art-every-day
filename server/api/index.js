const bodyParser = require("body-parser");

module.exports = (app) => {
	app.use(bodyParser.json())

	app.get("/api/me");
	app.get("/api/users");
	app.post("/api/users", (req, res) => {
		console.log(req.body);
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



			res.status(201).send();
		} else {
			// send 400
			res.status(400).send();
		}
	});
};
