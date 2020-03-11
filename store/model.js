const Sequelize = require("sequelize");
const db = require("../db");

const Store = db.define("store", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // opening_hours: {
  //   type: Sequelize.ARRAY(Sequelize.INTEGER)
  // },
  google_place_id: {
    type: Sequelize.STRING
  },
  coordinate_lat: { type: Sequelize.STRING },
  coordinate_lng: { type: Sequelize.STRING }
});

module.exports = Store;
