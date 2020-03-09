const Sequelize = require("sequelize");
const db = require("../db");

const Connect = db.define("connect", {
  userId: {
    type: Sequelize.INTEGER
  },
  productId: {
    type: Sequelize.INTEGER
  },
  storeId: {
    type: Sequelize.INTEGER
  }
});

module.exports = Connect;
