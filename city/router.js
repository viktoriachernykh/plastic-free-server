const { Router } = require("express");
const { Op } = require("sequelize");
const City = require("./model");
const router = new Router();

router.get("/city/:key", async (req, res, next) => {
  const { key } = req.params;
  try {
    const cities = await City.findAll({
      where: { name: { [Op.iLike]: `%${key}%` } },
    });
    res.send(cities);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
