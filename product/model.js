const Sequelize = require('sequelize');
const db = require('../db');
const Category = require('../category/model');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Product.belongsTo(Category);
Category.hasMany(Product);

module.exports = Product;
