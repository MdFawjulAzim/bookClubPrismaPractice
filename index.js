const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());

// Routes
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");
const reviewRoutes = require("./routes/reviews");
const followRoutes = require("./routes/follows");

app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/reviews", reviewRoutes);
app.use("/follows", followRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
