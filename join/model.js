const db = require("../db");
const Store = require("../store/model");
const Product = require("../product/model");

const Join = db.define("product_store", {}, { timestamps: false });

Product.belongsToMany(Store, {
  through: Join,
  as: "Store",
  foreignKey: "productId"
});
Store.belongsToMany(Product, {
  through: Join,
  as: "Product",
  foreignKey: "storeId"
});

module.exports = Join;
