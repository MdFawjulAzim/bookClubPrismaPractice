const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getReviews = async (req, res) => {
  const reviews = await prisma.review.findMany({
    include: { user: true, book: true },
  });
  return res.status(200).json({
    status: "success",
    message: "Reviews fetched successfully",
    data: reviews,
  });
};

exports.createReview = async (req, res) => {
  const { rating, comment, bookId, userId } = req.body;

  // Input validation
  if (!rating || !bookId || !userId) {
    return res.status(400).json({
      status: "error",
      message: "rating, bookId, and userId are required",
    });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      status: "error",
      message: "rating must be between 1 and 5",
    });
  }

  try {
    const review = await prisma.review.create({
      data: { rating, comment, bookId, userId },
    });

    return res.status(201).json({
      status: "success",
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    console.error(error);

    //  Foreign key error (invalid bookId or userId)
    if (error.code === "P2003") {
      return res.status(400).json({
        status: "error",
        message: "Invalid bookId or userId",
      });
    }

    //  Generic server error
    return res.status(500).json({
      status: "error",
      message: "Failed to create review",
      error: error.message,
    });
  }
};

exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const review = await prisma.review.update({
      where: { id: parseInt(id) },
      data: { rating, comment },
    });

    return res.status(200).json({
      status: "success",
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    console.error("updateReview error:", error);

    if (error.code === "P2025") {
      // Prisma error when record not found
      return res.status(404).json({
        status: "error",
        message: "Review not found",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Failed to update review",
      error: error.message,
    });
  }
};
