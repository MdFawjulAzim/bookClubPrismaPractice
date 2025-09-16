const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);

module.exports = router;
