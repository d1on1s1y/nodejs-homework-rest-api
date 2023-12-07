const mongoose = require("mongoose");
const app = require("./app");
const PASSWORD = "UZjKxPZUM2hW01pj";
const DB_HOST = `mongodb+srv://Denis:${PASSWORD}@cluster0.cqmizph.mongodb.net/`;
const PORT = 3000;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
