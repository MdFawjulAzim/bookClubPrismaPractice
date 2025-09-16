const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    include: { books: true, followers: true, following: true },
  });
  res.status(200).json({
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
  res.status(200).json({
    status: "success",
    message: "User fetched successfully",
    data: user,
  });
};
