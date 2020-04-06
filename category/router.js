const { Router } = require("express");
const Category = require("./model");

const router = new Router();

router.post("/category", async function (req, res, next) {
  console.log("=====================", req.body.name);

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

module.exports = router;
