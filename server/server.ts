import * as express from "express";
import ITileDao from "./dao/ITileDao";
import IndexViewModel from "./models/IndexViewModel";
import FileTileDao from "./dao/FileTileDao";
import ValidationFileWriter from "./logic/ValidationFileWriter";
import TileModel from "./models/TileModel";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : "3000";
const app = express();

app.set("views", process.cwd() + "/server/templates");

app.use("/dist", express.static("dist"));
app.use("/images", express.static("images"));

app.get("/", (req, res) => {
  //trim() важен, потому что на Windows команда SET NODE_ENV=production дописывает пробел в конце
  const developement = process.env.NODE_ENV && process.env.NODE_ENV.trim() === "developement";
  var tileDao: ITileDao = new FileTileDao();
  var validationFileWriter = new ValidationFileWriter();
  var tiles: TileModel[];
  try {
    tiles = tileDao.getAll();
  } catch(e) {
    console.log(e);
    validationFileWriter.write(e);
    tiles = [];
  }
  validationFileWriter.removeFile();
  const model = new IndexViewModel(developement, tiles);
  res.render("index.ejs", { model });
});

// app.get("/tile/:id"), (req, res) => {
//   req.params.id
// }

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});