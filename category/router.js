const { Router } = require('express');
const Category = require('./model');
const Product = require('../product/model');
const Country = require('../country/model');
const categoriesData = require('./../data/categories');
const productsData = require('./../data/products');
const countriesData = require('./../data/countries');

const router = new Router();

router.post('/category', async function (req, res, next) {
  const sameCategory = await Category.findOne({
    where: {
      name: req.body.name,
    },
  });
  if (!sameCategory)
    try {
      const category = await Category.create(req.body);
      res.send(category);
    } catch (error) {
      next(error);
    }
});

router.get('/category', async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    if (categories.length > 1) {
      res.send(categories);
    } else {
      // categoriesData.map((c) => console.log(c.name));
      categoriesData.map((c) => Category.create({ name: c.name }));
      // productsData.map((p) => console.log(p.name, p.categoryId));
      productsData.map((p) =>
        Product.create({ name: p.name, categoryId: p.categoryId })
      );
      // countriesData.map((c) => console.log(c.name));
      countriesData.map((c) => Country.create({ name: c.name }));
    }
  } catch (error) {
    next(error);
  }
});

router.get('/category/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id, {
      include: [{ model: Product }],
    });
    res.send(category);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
