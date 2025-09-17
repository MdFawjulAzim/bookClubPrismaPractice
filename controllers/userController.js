const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    include: { books: true, followers: true, following: true },
  });
  return res.status(200).json({
    status: "success",
    message: "Users fetched successfully",
    data: users,
  });
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  //   console.log(typeof id);
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: { books: true, followers: true, following: true },
  });
  return res.status(200).json({
    status: "success",
    message: "User fetched successfully",
    data: user,
  });
};

exports.createUser = async (req, res) => {
  const { name, email } = req.body;

  // Input validation
  if (!name || !email) {
    return res.status(400).json({
      status: "error",
      message: "Name and email are required",
    });
  }

  try {
    const user = await prisma.user.create({ data: { name, email } });

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    // Prisma unique constraint error (duplicate email)
    if (error.code === "P2002") {
      return res.status(409).json({
        status: "error",
        message: "Email already exists",
      });
    }

    // Generic server error
    return res.status(500).json({
      status: "error",
      message: "Failed to create user",
      error: error.message,
    });
  }
};

// controllers/userController.js

exports.getFeed = async (req, res) => {
  const { id } = req.params;

  // Find all users the current user is following
  const following = await prisma.follows.findMany({
    where: { followerId: parseInt(id) },
    include: {
      following: {
        include: {
          books: { include: { genres: true, reviews: true, user: true } },
        },
      },
    },
  });

  // Flatten all books into a single array
  const feedBooks = following.flatMap((f) => f.following.books);

  return res.status(200).json({
    status: "success",
    message: "Feed fetched successfully",
    data: feedBooks,
  });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email },
    });

    return res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("updateUser error:", error);

    if (error.code === "P2025") {
      // Prisma error when record not found
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Failed to update user",
      error: error.message,
    });
  }
};
