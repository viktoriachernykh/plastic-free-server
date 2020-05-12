const db = require("../db");
const Location = require("../location/model");
const User = require("../user/model");

const LikedLocation = db.define("user_location", {}, { timestamps: false });

User.belongsToMany(Location, {
  through: LikedLocation,
  as: "Location",
  foreignKey: "userId",
});
Location.belongsToMany(User, {
  through: LikedLocation,
  as: "User",
  foreignKey: "locationId",
});

module.exports = LikedLocation;
