module.exports = (app) => {
	app.get("/api/me");
	app.get("/api/users");
	app.post("/api/users", (req, res) => {
		console.log(req);
		res.send({
			mission: "accomplished"
		});
	});
};
