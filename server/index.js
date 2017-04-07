require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");

let app = express();

// redirect to HTTPS if in production/staging

app.use((req, res, next) => {
	// if we're in production, and x-forwarded-proto is not https, redirect to the same URL with HTTPS

	if ((process.env.NODE_ENV == "production") && (req.headers["x-forwarded-proto"] != "https")) {
		res.redirect("https://" + req.hostname + req.url);
	} else {
		next();
	}
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


require("./authRoutes.js")(app);
require("./api/index.js")(app);

app.use(express.static(path.resolve(__dirname + "/../frontend-built")));

app.use(express.static(path.resolve(__dirname + "/../assets")));

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname + "/../index.html"));
});


let port = process.env.PORT || 1234;
app.listen(port, () => {
	console.log(`Listening on ${port}...`); // eslint-disable-line no-console
});
