const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const devServerPort = 8081;

const dist = path.resolve(__dirname, "dist");

const fileLoaderSettings = {
  name: "[name]-[hash].[ext]",
  publicPath: "/dist/",
  outputPath: "file-loader/"
};

const urlLoaderSettings = Object.assign(fileLoaderSettings, { limit: 100000 });

module.exports = {
  entry: "./src/entry",
  output: {
    path: dist,
    filename: "bundle.js",
    publicPath: "./"
  },
  resolve: {
    modules: ["node_modules"],
    extensions: ["*", ".js", ".jsx", ".json", ".ts", ".tsx"],
    alias: {
      "src": path.resolve(__dirname, "src"),
      "components": path.resolve(__dirname, "src")
    }
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
      // {
      //   test: /\.js/,
      //   loaders: [
      //     "babel-loader"
      //   ],
      //   include: path.resolve(__dirname, "src")
      // },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader?sourceMap", "less-loader?sourceMap"]
        }),
        include: [path.resolve(__dirname, "src")]
      },
      {
        test: /\.(png|gif|ttf|otf|svg|eot|woff|woff2)$/,
        loader: "url-loader",
        options: urlLoaderSettings
      },
      {
        test: /\.jpg$/,
        loader: "file-loader",
        options: fileLoaderSettings
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ filename: "bundle.css", allChunks: true }),
  ]
};