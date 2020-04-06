const db = require("../db");
const Store = require("../store/model");
const Product = require("../product/model");

const JoinProductStore = db.define("product_store", {}, { timestamps: false });

Product.belongsToMany(Store, {
  through: JoinProductStore,
  as: "Store",
  foreignKey: "productId",
});
Store.belongsToMany(Product, {
  through: JoinProductStore,
  as: "Product",
  foreignKey: "storeId",
});

module.exports = JoinProductStore;
