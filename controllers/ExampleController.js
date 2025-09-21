const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getExample = async (req, res) => {
  // Example: Aggregate - Average Rating of all Reviews
  /*
  const avgRating = await prisma.review.aggregate({
    _avg: {
      rating: true,
    },
  });
  console.log("Average Rating:", avgRating._avg.rating);
*/
  // Example: Aggregate - Sum of all Reviews Ratings
  /*
  const sumRating = await prisma.review.aggregate({
    _sum: {
      rating: true,
    },
  });
  console.log("Sum of Ratings:", sumRating._sum.rating);
  */
  // Example: Aggregate - min of all Reviews Ratings with filter
  /*
  const minRating = await prisma.review.aggregate({
    // where: {
    //   rating: {
    //     gt: 3,
    //   },
    // },
    _min: {
      rating: true,
    },
  });
  console.log("Min of Ratings:", minRating._min.rating);
  */
  // Example: Aggregate - max of all Reviews Ratings
  /*
  const maxRating = await prisma.review.aggregate({
    _max: {
      rating: true,
    },
  });
  console.log("Max of Ratings:", maxRating._max.rating);
  */
  // Example: Find many with include relations and order by
  /*
  const booksSerial = await prisma.book.findMany({
    include: {
      reviews: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  console.log(booksSerial);
  */
  // Example: Combine multiple aggregations
  /*
  const stats = await prisma.review.aggregate({
    _count: { id: true },
    _avg: { rating: true },
    _max: { rating: true },
    _min: { rating: true },
  });
  */

  const genreStats = await prisma.book.groupBy({
    by: ["BookGenres"],
    _count: { id: true },
  });

  return res.status(200).json({
    status: "success",
    message: "Example fetched successfully",
    data: genreStats,
  });
};
