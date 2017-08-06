const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const IS_PRODUCTION = process.env.NODE_ENV === "production";

const DEV_SERVER_PORT = 8081;

const dist = path.resolve(__dirname, "dist");

const PUBLIC_PATH = IS_PRODUCTION ? "/dist/" : `http://localhost:${DEV_SERVER_PORT}/dev-server-dist/`;

const fileLoaderSettings = {
  name: "[name]-[hash].[ext]",
  publicPath: PUBLIC_PATH,
  outputPath: "file-loader/"
};

const urlLoaderSettings = Object.assign(fileLoaderSettings, { limit: 100000 });

const cssLoaders = IS_PRODUCTION
  ? ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ["css-loader?sourceMap"]
  })
  : ["style-loader", "css-loader?sourceMap"];

const lessLoaders = IS_PRODUCTION
  ? ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ["css-loader?sourceMap", "less-loader?sourceMap"]
  })
  : ["style-loader", "css-loader?sourceMap", "less-loader?sourceMap"];

const config = {
  entry: "./src/entry",
  output: {
    filename: "bundle.js",
    path: dist,
    publicPath: PUBLIC_PATH
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
    publicPath: "/dev-server-dist/",
    host: "localhost",
    port: DEV_SERVER_PORT,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: [
          "babel-loader",
          "awesome-typescript-loader"
        ]
      },
      // {
      //   test: /\.js/,
      //   loader: "babel-loader",
      //   exclude: path.resolve(__dirname, "node_modules")
      // },
      {
        test: /\.css$/,
        use: cssLoaders,
        include: [path.resolve(__dirname, "src")]
      },
      {
        test: /\.less$/,
        use: lessLoaders,
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
  }
};

if (IS_PRODUCTION) {
  config.plugins = [
    new ExtractTextPlugin({ filename: "bundle.css", allChunks: true })
  ];
}

module.exports = config;