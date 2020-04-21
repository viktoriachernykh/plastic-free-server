const { Router } = require("express");
const Country = require("./model");

const router = new Router();
const { Op } = require("sequelize");

router.get("/country/:key", async (req, res, next) => {
  const { key } = req.params;
  try {
    const countries = await Country.findAll({
      where: { name: { [Op.iLike]: `%${key}%` } },
    });
    res.send(countries);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
