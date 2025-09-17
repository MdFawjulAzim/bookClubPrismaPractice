const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  getFeed,
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);

router.get("/:id/feed", getFeed);
module.exports = router;
