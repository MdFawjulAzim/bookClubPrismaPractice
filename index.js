// index.js
const { PrismaClient } = require("@prisma/client");
const express = require("express");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
