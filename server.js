const express = require("express");
const dotenv = require("dotenv");

const productRoutes = require("./routes/productRoutes");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Welcome!");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
