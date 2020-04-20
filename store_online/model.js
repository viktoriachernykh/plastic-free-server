const Sequelize = require("sequelize");
const db = require("../db");
const Country = require("../country/model");

const OnlineStore = db.define("store_online", {
  link: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
OnlineStore.belongsTo(Country);

module.exports = OnlineStore;
