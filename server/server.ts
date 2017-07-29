import * as express from "express";

const app = express();

app.set("views", process.cwd() + "\\server\\templates");

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.render("index.ejs", { model: { production: process.env.NODE_ENV === "production" } });
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});