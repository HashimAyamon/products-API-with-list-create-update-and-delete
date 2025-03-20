const pool = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// Get all products (Available for all users)
const getProducts = asyncHandler(async (req, res) => {
  const result = await pool.query("SELECT * FROM products");
  res.json(result.rows);
});

// Get a single product (Available for all users)
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(result.rows[0]);
});

// Create a product (Only for 'admin')
const createProduct = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Access denied. Admins only.", 403));
  }

  const { title, image, price, offerPrice } = req.body;
  const result = await pool.query(
    "INSERT INTO products (title, image, price, offer_price) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, image, price, offerPrice]
  );

  res.status(201).json(result.rows[0]);
});

// Update a product (Only for 'admin')
const updateProduct = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Access denied. Admins only.", 403));
  }

  const { id } = req.params;
  const { title, image, price, offerPrice } = req.body;

  const result = await pool.query(
    "UPDATE products SET title = $1, image = $2, price = $3, offer_price = $4 WHERE id = $5 RETURNING *",
    [title, image, price, offerPrice, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(result.rows[0]);
});

// Delete a product (Only for 'admin')
const deleteProduct = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Access denied. Admins only.", 403));
  }

  const { id } = req.params;
  const result = await pool.query(
    "DELETE FROM products WHERE id = $1 RETURNING *",
    [id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json({ message: "Product deleted successfully" });
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
