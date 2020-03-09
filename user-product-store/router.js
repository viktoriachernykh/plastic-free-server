const { Router } = require("express");
const Connect = require("./model");
const router = new Router();

// router.post("/store", auth, async function(req, res, next) {
router.post("/connect", async function(req, res, next) {
  // console.log(req.body);
  try {
    const connect = await Connect.create(req.body);
    // console.log("store created???", store);
    res.send(store);
  } catch (error) {
    next(error);
  }
});

// router.get("/connect", async (req, res, next) => {
//   try {
//     const stores = await Store.findAll();
//     res.send(stores);
//   } catch (error) {
//     next(error);
//   }
// });

router.get("connect/user/:id", async (req, res, next) => {
  // const storeId = req.params.id;
  // try {
  //   const store = await Store.findByPk(storeId);
  //   if (!store) {
  //     res
  //       .status(404)
  //       .send({ message: "Store with this ID doesn't exist" })
  //       .end();
  //   }
  //   res.send(store);
  // } catch (error) {
  //   next(error);
  // }
});

router.get("connect/product/:id", async (req, res, next) => {
  // const storeId = req.params.id;
  // try {
  //   const store = await Store.findByPk(storeId);
  //   if (!store) {
  //     res
  //       .status(404)
  //       .send({ message: "Store with this ID doesn't exist" })
  //       .end();
  //   }
  //   res.send(store);
  // } catch (error) {
  //   next(error);
  // }
});

router.get("connect/store/:id", async (req, res, next) => {
  // const storeId = req.params.id;
  // try {
  //   const store = await Store.findByPk(storeId);
  //   if (!store) {
  //     res
  //       .status(404)
  //       .send({ message: "Store with this ID doesn't exist" })
  //       .end();
  //   }
  //   res.send(store);
  // } catch (error) {
  //   next(error);
  // }
});
module.exports = router;
