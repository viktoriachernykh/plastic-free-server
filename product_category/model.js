const db = require("../db");
const Product = require("../product/model");
const Category = require("../category/model");

const JoinProductCategory = db.define(
  "product_category",
  {},
  { timestamps: false }
);

Category.belongsToMany(Product, {
  through: JoinProductCategory,
  as: "Product",
  foreignKey: "categoryId",
});
Product.hasOne(Category, {
  through: JoinProductCategory,
  as: "Category",
  foreignKey: "productId",
});

module.exports = JoinProductCategory;
