const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  getFeed,
  updateUser,
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);

router.get("/:id/feed", getFeed);
module.exports = router;
