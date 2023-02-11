import { Sequelize, DataTypes } from "sequelize";
import basket from "./basket.js";
import basket_product from "./basket_product.js";
import brand from "./brand.js";
import product_info from "./product_info.js";
import product from "./product.js";
import raiting from "./raiting.js";
import user from "./user.js";
import Type from "./type.js";
import dotenv from "dotenv";
import applyExtraSetup from "./extra_setup.js";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
  }
);

const db = {};

db.DataTypes = DataTypes;
db.sequelize = sequelize;

db.type = Type(sequelize, DataTypes);
db.brand = brand(sequelize, DataTypes);
db.product = product(sequelize, DataTypes);
db.user = user(sequelize, DataTypes);
db.basket = basket(sequelize, DataTypes);
db.basketProduct = basket_product(sequelize, DataTypes);
db.raiting = raiting(sequelize, DataTypes);
db.productInfo = product_info(sequelize, DataTypes);

applyExtraSetup(db);
export default db;
