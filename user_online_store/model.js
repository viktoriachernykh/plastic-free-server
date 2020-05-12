const db = require("../db");
const OnlineStore = require("../online_store/model");
const User = require("../user/model");

const LikedOnlineStore = db.define(
  "user_online_store",
  {},
  { timestamps: false }
);

User.belongsToMany(OnlineStore, {
  through: LikedOnlineStore,
  as: "OnlineStore",
  foreignKey: "userId",
});
OnlineStore.belongsToMany(User, {
  through: LikedOnlineStore,
  as: "User",
  foreignKey: "onlineStoreId",
});

module.exports = LikedOnlineStore;
