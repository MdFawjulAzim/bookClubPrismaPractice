const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

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
