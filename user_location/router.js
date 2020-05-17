const { Router } = require('express');
const LikedLocation = require('./model');
const router = new Router();

router.post('/user_location', async function (req, res, next) {
  try {
    const like = await LikedLocation.create(req.body);
    res.send(like);
  } catch (error) {
    next(error);
  }
});

router.delete('/user_location', async function (req, res, next) {
  const { userId, locationId } = req.body;
  try {
    const dislike = await LikedLocation.destroy({
      where: {
        userId,
        locationId,
      },
    });
    res.send({ userId, locationId });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
