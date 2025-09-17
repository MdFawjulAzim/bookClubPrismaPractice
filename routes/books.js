const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBook,
  createBook,
  searchByGenre,
  updateBook,
} = require("../controllers/bookController");

router.get("/", getBooks);
router.get("/search", searchByGenre);
router.get("/:id", getBook);
router.post("/", createBook);
router.put("/:id", updateBook);

// routes/books.js
module.exports = router;
