const Sequelize = require("sequelize");
const db = require("../db");
const City = require("../city/model");

const Location = db.define("location", {
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
Location.belongsTo(City);

module.exports = Location;
