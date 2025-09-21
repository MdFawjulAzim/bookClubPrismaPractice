const express = require("express");
const { getExample } = require("../controllers/ExampleController");
const router = express.Router();

router.get("/", getExample);

module.exports = router;
