const Sequelize = require("sequelize");
const db = require("../db");

const Store = db.define("store", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  coordinate_lat: { type: Sequelize.STRING },
  coordinate_lng: { type: Sequelize.STRING },
});

module.exports = Store;
