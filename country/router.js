const { Router } = require('express');
const Country = require('./model');
// const data = require('./data');

const router = new Router();
const { Op } = require('sequelize');

router.get('/country/:key', async (req, res, next) => {
  const { key } = req.params;
  try {
    const countries = await Country.findAll({
      where: { name: { [Op.iLike]: `%${key}%` } },
    });
    res.send(countries);
    // countries.length > 0
    // ? res.send(countries)
    // : data.map((country) => Country.create({ name: country.name }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
