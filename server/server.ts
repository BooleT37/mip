import * as express from "express";
import ITileDao from "./dao/ITileDao";
import StubTileDao from "./dao/StubTileDao";
import IndexViewModel from "./models/IndexViewModel";

const app = express();

app.set("views", process.cwd() + "\\server\\templates");

app.use("/dist", express.static("dist"));
app.use("/images", express.static("images"));

app.get("/", function (req, res) {
  //trim() важен, потому что на Windows команда SET NODE_ENV=production дописывает пробел в конце
  const production = process.env.NODE_ENV && process.env.NODE_ENV.trim() === "production";
  const tileDao: ITileDao = new StubTileDao();
  const tiles = tileDao.getAll();
  const model = new IndexViewModel(production, tiles);
  res.render("index.ejs", { model });
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});