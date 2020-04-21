const db = require("../db");
const OnlineStore = require("../online_store/model");
const Product = require("../product/model");

const ProductOnlineStore = db.define(
  "product_online_store",
  {},
  { timestamps: false }
);

Product.belongsToMany(OnlineStore, {
  through: ProductOnlineStore,
  as: "OnlineStore",
  foreignKey: "productId",
});
OnlineStore.belongsToMany(Product, {
  through: ProductOnlineStore,
  as: "Product",
  foreignKey: "onlineStoreId",
});

module.exports = ProductOnlineStore;
