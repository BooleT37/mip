import * as express from "express";

const app = express();

app.set("views", process.cwd() + "\\server\\templates");

app.use("/dist", express.static("dist"));

app.get("/", function (req, res) {
  //trim() важен, потому что на Windows команда SET NODE_ENV=production дописывает пробел в конце
  const production = process.env.NODE_ENV && process.env.NODE_ENV.trim() === "production";
  res.render("index.ejs", { model: { production } });
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});