const db = require("../db");
const Location = require("../location/model");
const Product = require("../product/model");

const ProductLocation = db.define(
  "product_location",
  {},
  { timestamps: false }
);

Product.belongsToMany(Location, {
  through: ProductLocation,
  as: "Location",
  foreignKey: "productId",
});
Location.belongsToMany(Product, {
  through: ProductLocation,
  as: "Product",
  foreignKey: "locationId",
});

module.exports = ProductLocation;
