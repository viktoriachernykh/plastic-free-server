const { Router } = require("express");
const City = require("./model");

const router = new Router();

router.get("/city", async (req, res, next) => {
  try {
    const city = await City.findAll();
    res.send(city);
  } catch (error) {
    next(error);
  }
});

// router.get("/city/:id", async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     const stores = await Product.findAll({
//       where: { cityId: id },
//     });
//     res.send(products);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
