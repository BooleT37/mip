const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const devServerPort = 8081;

const dist = path.resolve(__dirname, "dist");

module.exports = {
  entry: "./src/entry.ts",
  output: {
    path: dist,
    filename: "bundle.js",
    publicPath: "./"
  },
  devtool: "source-map",
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
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader?sourceMap", "less-loader?sourceMap"]
        }),
        include: [path.resolve(__dirname, "src")]
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
  },
  plugins: [
    new ExtractTextPlugin({ filename: "bundle.css", allChunks: true }),
  ]
};