import * as express from "express";
import ITileDao from "./dao/ITileDao";
import IndexViewModel from "./models/IndexViewModel";
// import StubTileDao from "./dao/StubTileDao";
import FileTileDao from "./dao/FileTileDao";
import ValidationFileWriter from "./logic/ValidationFileWriter";
import TileModel from "./models/TileModel";
import ValidationError from "./logic/ValidationError";
import Logger from "./logic/Logger";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : "3000";
const app = express();

app.set("views", process.cwd() + "/server/templates");

app.use("/dist", express.static("dist"));
app.use("/images", express.static("images"));
app.use("/tiles_data", express.static("tiles_data"));

app.get("/", (req, res) => {
  //trim() важен, потому что на Windows команда SET NODE_ENV=production дописывает пробел в конце
  const developement = process.env.NODE_ENV && process.env.NODE_ENV.trim() === "developement";
  var tileDao: ITileDao = new FileTileDao();
  var validationFileWriter = new ValidationFileWriter();
  var tiles: TileModel[];
  try {
    tiles = tileDao.getAll();
    validationFileWriter.removeFile();
  } catch(e) {
    if (e.isValidationError) {
      validationFileWriter.write(e.message);
    } else {
      Logger.log(e.message);
    }
    tiles = [];
  }
  const model = new IndexViewModel(developement, tiles);
  res.render("index.ejs", { model });
});

app.get(("/tile/:id"), (req, res) => {
  var tileDao: ITileDao = new FileTileDao();
  res.setHeader("content-type", "application/json");
  try {
    res.send(JSON.stringify(tileDao.getForId(req.params.id)));
  } catch(e) {
    res.statusCode = 500;
    res.send(JSON.stringify(e));
  }
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});