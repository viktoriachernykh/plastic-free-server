const { Router } = require("express");
const Product = require("./model");
const Store = require("../store/model");
const City = require("../city/model");

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

// router.get("/product", async (req, res, next) => {
//   const limit = Math.min(req.query.limit || 5, 100);
//   const offset = req.query.offset || 0;
//   try {
//     const products = await Product.findAndCountAll({
//       limit,
//       offset,
//     });
//     res.send(products);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/product/:id", async (req, res, next) => {
//   const productId = req.params.id;
//   try {
//     const product = await Product.findByPk(productId, {
//       include: [{ model: Store, as: "Store" }],
//     });
//     res.send(product);
//   } catch (error) {
//     next(error);
//   }
// });

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
      const product = await Product.findByPk(id, {
        include: [
          { model: Store, as: "Store", where: { cityId: findCity.id } },
        ],
      });
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
