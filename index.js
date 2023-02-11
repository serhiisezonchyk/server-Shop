import express, { json, urlencoded } from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import db from "./models/index.js";
import router from "./routes/index.js";
import errorHandler from "./middleware/ErrorHandling.js";

import { fileURLToPath } from 'url';
import path, { resolve } from "path";

const app = express();

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(cors());

app.use(express.json());
app.use(express.static(resolve(path.dirname(fileURLToPath(import.meta.url)), "static")))
app.use(fileUpload({}));

app.use('/api', router);

app.use(errorHandler);

app.use(urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});