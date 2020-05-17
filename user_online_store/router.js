const { Router } = require('express');
const LikedOnlineStore = require('./model');
const router = new Router();

router.post('/user_online_store', async function (req, res, next) {
  try {
    const like = await LikedOnlineStore.create(req.body);
    res.send(like);
  } catch (error) {
    next(error);
  }
});

router.delete('/user_online_store', async function (req, res, next) {
  const { userId, onlineStoreId } = req.body;
  try {
    const dislike = await LikedOnlineStore.destroy({
      where: {
        userId,
        onlineStoreId,
      },
    });
    res.send({ userId, onlineStoreId });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
