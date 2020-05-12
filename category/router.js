const { Router } = require('express');
const Category = require('./model');
const Product = require('../product/model');

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
    res.send(categories);
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
