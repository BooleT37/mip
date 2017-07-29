const path = require("path");

const devServerPort = 8081;

const dist = path.resolve(__dirname, "dist");

module.exports = {
  entry: "./src/entry.ts",
  output: {
    path: dist,
    filename: "bundle.js",
    publicPath: "./"
  },
  devServer: {
    publicPath: "/dist/",
    host: "localhost",
    port: devServerPort,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  module: {
    loaders: [
      {
        test: /\.tsx?/,
        loaders: [
          "babel-loader",
          "awesome-typescript-loader"
        ]
      },
      {
        test: /\.js/,
        loaders: [
          "babel-loader"
        ],
        include: path.resolve(__dirname, "src")
      },
      {
        test: /\.less$/,
        loaders: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.(png|jpg)$/,
        loaders: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
};