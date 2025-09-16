const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create genres
  const genres = await prisma.genre.createMany({
    data: [
      { name: "Fantasy" },
      { name: "Sci-Fi" },
      { name: "Mystery" },
      { name: "Non-Fiction" },
    ],
    skipDuplicates: true,
  });

  // Create users
  const users = await prisma.user.createMany({
    data: [
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
      { name: "Charlie", email: "charlie@example.com" },
    ],
    skipDuplicates: true,
  });

  // Fetch created genres & users
  const allGenres = await prisma.genre.findMany();
  const allUsers = await prisma.user.findMany();

  // Create books
  await prisma.book.createMany({
    data: [
      { title: "The Hobbit", author: "J.R.R. Tolkien", userId: allUsers[0].id },
      { title: "Dune", author: "Frank Herbert", userId: allUsers[1].id },
      {
        title: "Sherlock Holmes",
        author: "Arthur Conan Doyle",
        userId: allUsers[2].id,
      },
    ],
  });

  // Add reviews
  const allBooks = await prisma.book.findMany();
  await prisma.review.createMany({
    data: [
      {
        rating: 5,
        comment: "Amazing!",
        bookId: allBooks[0].id,
        userId: allUsers[1].id,
      },
      {
        rating: 4,
        comment: "Great read",
        bookId: allBooks[1].id,
        userId: allUsers[2].id,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
