const express = require("express");
const path = require("path");

let app = express();

app.use(express.static(path.resolve(__dirname + "/../frontend-built")));

app.use(express.static(path.resolve(__dirname + "/../assets")));

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname + "/../index.html"));
});


let port = process.env.PORT || 1234;
app.listen(port, () => {
	console.log(`Listening on ${port}...`);
});
