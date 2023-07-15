module.exports = {
  mode: "development",
  entry: ["./client/index.js"],
  output: {
    path: __dirname + "/public",
    filename: "bundle.js",
  },
  context: __dirname,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      // {
      // test: /\.css$/,
      // use: ["style-loader", "css-loader"],
      //   test: /\.(sass|less|css)$/,
      //   use: ["style-loader", "css-loader", "less-loader"],
      // },
      // {
      //   test: /\.svg$/,
      //   use: "file-loader",
      // },
    ],
  },
};
