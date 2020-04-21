const request = require("superagent");
const { Router } = require("express");

const Product = require("../product/model");
const Location = require("./model");
const ProductLocation = require("../product_location/model");
const City = require("../city/model");
const Country = require("../country/model");
// const { auth } = require("../authentication/authMiddleware");

const router = new Router();
const { Op } = require("sequelize");

router.post("/location", async function (req, res, next) {
  const { newLocation, productId } = req.body;
  googleId = newLocation.google_place_id;
  const sameLocation = await Location.findOne({
    where: {
      address: newLocation.address,
    },
  });
  if (sameLocation) {
    try {
      const join = await ProductLocation.create({
        productId,
        locationId: sameLocation.id,
      });
      res.send(sameLocation);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const googleRequest = await request(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googleId}&fields=name&key=${process.env.API_KEY}`
      );

      const exactCountryName = await Country.findOne({
        where: { name: { [Op.iLike]: `${newLocation.country}` } },
      });

      const country = exactCountryName
        ? exactCountryName
        : await Country.findOne({
            where: { name: { [Op.iLike]: `%${newLocation.country}%` } },
          });

      const sameCity = await City.findOne({
        where: { name: newLocation.city, countryId: country.id },
      });
      const city = sameCity
        ? sameCity
        : await City.create({ name: newLocation.city, countryId: country.id });

      const updatedLocation = {
        name: googleRequest.body.result.name,
        address: newLocation.address,
        coordinate_lat: newLocation.coordinate_lat,
        coordinate_lng: newLocation.coordinate_lng,
        cityId: city.id,
      };
      const createdLocation = await Location.create(updatedLocation);
      const join = await ProductLocation.create({
        productId,
        locationId: createdLocation.id,
      });
      res.send(createdLocation);
    } catch (error) {
      next(error);
    }
  }
});

router.get("/location/:id", async (req, res, next) => {
  const locationId = req.params.id;
  try {
    const location = await Location.findByPk(locationId, {
      include: [{ model: Product, as: "Product" }],
    });
    res.send(location);
  } catch (error) {
    next(error);
  }
});

router.get("/location/find/:keyword", async (req, res, next) => {
  const keyword = req.params.keyword;
  try {
    const location = await Location.findAll({
      where: {
        name: { [Op.iLike]: `%${keyword}%` },
      },
    });
    if (!location.length > 0) {
      res
        .status(404)
        .send({ message: "location with this name doesn't exist" });
    } else {
      res.send(location);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
