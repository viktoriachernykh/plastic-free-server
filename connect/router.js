const { Router } = require("express");
const Connect = require("./model");
const router = new Router();

router.post("/connect", async function(req, res, next) {
  try {
    const connect = await Connect.create(req.body);
    res.send(connect);
  } catch (error) {
    next(error);
  }
});

router.get("/connect/user/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const connect = await Connect.findAll({ where: { userId: id } });
    if (!connect || connect.length < 1) {
      res.status(400).send({ message: "User doesn't have connections" });
    }
    res.send(connect);
  } catch (error) {
    next(error);
  }
});

router.get("/connect/product/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const connect = await Connect.findAll({ where: { productId: id } });
    if (!connect || connect.length < 1) {
      res.status(400).send({ message: "Product doesn't have connections" });
    }
    res.send(connect);
  } catch (error) {
    next(error);
  }
});

router.get("/connect/store/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const connect = await Connect.findAll({ where: { storeId: id } });
    if (!connect || connect.length < 1) {
      res.status(400).send({ message: "Store doesn't have connections" });
    }
    res.send(connect);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
