const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  logo: {
    type: Sequelize.STRING
  },
  favorite_stores: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  favorite_products: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  }
});

module.exports = User;
