const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create genres
  await prisma.genre.createMany({
    data: [
      { name: "Fantasy" },
      { name: "Sci-Fi" },
      { name: "Mystery" },
      { name: "Non-Fiction" },
    ],
    skipDuplicates: true,
  });

  // Create users
  await prisma.user.createMany({
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
  const allBooks = await prisma.book.createMany({
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
  const books = await prisma.book.findMany();
  await prisma.review.createMany({
    data: [
      {
        rating: 5,
        comment: "Amazing!",
        bookId: books[0].id,
        userId: allUsers[1].id,
      },
      {
        rating: 4,
        comment: "Great read",
        bookId: books[1].id,
        userId: allUsers[2].id,
      },
    ],
  });

  // Add follow relationships
  await prisma.follows.createMany({
    data: [
      { followerId: allUsers[0].id, followingId: allUsers[1].id }, // Alice follows Bob
      { followerId: allUsers[0].id, followingId: allUsers[2].id }, // Alice follows Charlie
      { followerId: allUsers[1].id, followingId: allUsers[2].id }, // Bob follows Charlie
    ],
    skipDuplicates: true,
  });

  console.log("Database seeded successfully with follows!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
