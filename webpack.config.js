process.noDeprecation = true;

module.exports = {
	entry: __dirname + "/frontend-src/entry.jsx",
	module: {
		rules: [{
			exclude: /(node_modules|bower_components)/,
			test: /\.jsx?$/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ["es2015", "react"]
				},
			}
		}]
	},
	output: {
		filename: "./frontend-built/app.js"
	},
};
