const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

const userRouter = require("./user/router");
const authRouter = require("./authentication/router");

const productRouter = require("./product/router");
const locationRouter = require("./location/router");
const onlineStoreRouter = require("./online_store/router");
const joinProductLocationRouter = require("./product_location/router");
const joinProductOnlineStoreRouter = require("./product_online_store/router");

const cityRouter = require("./city/router");
const countryRouter = require("./country/router");

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
  productRouter,
  locationRouter,
  onlineStoreRouter,
  cityRouter,
  countryRouter,
  joinProductLocationRouter,
  joinProductOnlineStoreRouter
);

app.listen(port, onListen);
