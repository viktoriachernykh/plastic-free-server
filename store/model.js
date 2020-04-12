const Sequelize = require("sequelize");
const db = require("../db");
const City = require("../city/model");

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
Store.belongsTo(City);

module.exports = Store;
