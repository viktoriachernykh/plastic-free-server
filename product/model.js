const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  likes: {
    type: Sequelize.INTEGER
  }
});

module.exports = Product;
