const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    include: { books: true, followers: true },
  });
  res.json(users);
};
