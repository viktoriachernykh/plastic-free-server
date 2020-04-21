const { Router } = require("express");
const Product = require("./model");
const Location = require("../location/model");
const OnlineStore = require("../online_store/model");
const City = require("../city/model");
const Country = require("../country/model");

const router = new Router();
const { Op } = require("sequelize");

router.post("/product", async function (req, res, next) {
  const sameProduct = await Product.findOne({
    where: {
      name: req.body.name,
    },
  });
  if (!sameProduct)
    try {
      const product = await Product.create(req.body);
      res.send(product);
    } catch (error) {
      next(error);
    }
});

router.get("/product/find/:keyword", async (req, res, next) => {
  const { keyword } = req.params;
  try {
    const product = await Product.findAll({
      where: { name: { [Op.iLike]: `%${keyword}%` } },
    });
    if (product.length === 0) {
      res.send({ keyword });
    } else {
      res.send(product);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/product/find/:id/:city", async (req, res, next) => {
  const { id, city } = req.params;
  try {
    const findCity = await City.findOne({
      where: { name: { [Op.iLike]: `${city}` } },
    });
    if (!findCity) {
      const product = await Product.findByPk(id);
      res.send({ product, city });
    } else {
      const findCountry = await Country.findByPk(findCity.countryId);

      const product = await Product.findByPk(id, {
        include: [
          { model: Location, as: "Location", where: { cityId: findCity.id } },
          {
            model: OnlineStore,
            as: "OnlineStore",
            where: { countryId: findCountry.id },
          },
        ],
      });
      console.log(product);

      if (!product) {
        const product = await Product.findByPk(id);
        res.send({ product, city });
      } else {
        res.send(product);
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
