const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getBooks = async (req, res) => {
  const books = await prisma.book.findMany({
    include: { genres: true, user: true, reviews: true },
  });
  return res.status(200).json({
    status: "success",
    message: "Books fetched successfully",
    data: books,
  });
};

exports.getBook = async (req, res) => {
  const { id } = req.params;
  const book = await prisma.book.findUnique({
    where: { id: parseInt(id) },
    include: { genres: true, user: true, reviews: true },
  });
  return res.status(200).json({
    status: "success",
    message: "Book fetched successfully",
    data: book,
  });
};

exports.createBook = async (req, res) => {
  const { title, author, userId, genreIds } = req.body;

  //  Input validation
  if (!title || !author || !userId || !Array.isArray(genreIds)) {
    return res.status(400).json({
      status: "error",
      message: "Title, author, userId and genreIds (array) are required",
    });
  }

  try {
    const book = await prisma.book.create({
      data: {
        title,
        author,
        userId,
        genres: { connect: genreIds.map((id) => ({ id })) },
      },
      include: { genres: true },
    });

    return res.status(201).json({
      status: "success",
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    console.error(error);

    // Prisma foreign key / relation error
    if (error.code === "P2003") {
      return res.status(400).json({
        status: "error",
        message: "Invalid userId or genreIds",
      });
    }

    //Unique constraint or other Prisma errors
    if (error.code === "P2002") {
      return res.status(409).json({
        status: "error",
        message: "Book with same title already exists",
      });
    }

    // Generic server error
    return res.status(500).json({
      status: "error",
      message: "Failed to create book",
      error: error.message,
    });
  }
};

exports.searchByGenre = async (req, res) => {
  const { genre } = req.query;
  const books = await prisma.book.findMany({
    where: { genres: { some: { name: genre } } },
    include: { genres: true, user: true, reviews: true },
  });

  return res.status(200).json({
    status: "success",
    message: "Books fetched successfully",
    data: books,
  });
};
