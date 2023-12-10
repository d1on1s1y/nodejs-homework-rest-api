const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Server error" } = error;
  if (error instanceof multer.MulterError) {
    if (error.message === "Unexpected field") {
      return res.status(400).send({ message: "Invalid body" });
    }
  }
  res.status(status).json({ message });
});

module.exports = app;
