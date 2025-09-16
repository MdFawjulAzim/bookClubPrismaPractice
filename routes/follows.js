const express = require("express");
const router = express.Router();
const {
  followUser,
  getFollowers,
  getFollowing,
} = require("../controllers/followController");

router.post("/", followUser);
router.get("/followers/:userId", getFollowers);
router.get("/following/:userId", getFollowing);

module.exports = router;
