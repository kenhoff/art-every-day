process.noDeprecation = true;

module.exports = {
	devtool: "cheap-module-eval-source-map",
	entry: __dirname + "/frontend-src/entry.jsx",
	module: {
		rules: [{
			exclude: /(node_modules|bower_components)/,
			test: /\.jsx?$/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ["react", "es2015"]
				},
			}
		}]
	},
	output: {
		filename: "./frontend-built/app.js"
	},
};
