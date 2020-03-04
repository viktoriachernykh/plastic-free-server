const Sequelize = require("sequelize");
const db = require("../db");
const User = require("../user/model");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER
  },
  rating: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  stores: { type: Sequelize.ARRAY(Sequelize.INTEGER) }
});

Product.belongsTo(User);
User.hasMany(Product);

module.exports = Product;
