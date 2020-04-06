const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

const userRouter = require("./user/router");
const authRouter = require("./authentication/router");
const storeRouter = require("./store/router");
const productRouter = require("./product/router");
const categoryRouter = require("./category/router");
const joinRouter = require("./product_store/router");

require("dotenv").config();

function onListen() {
  console.log(`Listening on port ${port}`);
}

const corsMiddleware = cors();
app.use(corsMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.use(
  userRouter,
  authRouter,
  storeRouter,
  productRouter,
  categoryRouter,
  joinRouter
);

app.listen(port, onListen);
