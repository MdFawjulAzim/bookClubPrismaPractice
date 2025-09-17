const express = require("express");
const router = express.Router();
const { getReviews, createReview, updateReview } = require("../controllers/reviewController");

router.get("/", getReviews);
router.post("/", createReview);
router.put("/:id", updateReview);

module.exports = router;
