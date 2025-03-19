const express = require('express');
const {
  getProducts,       // Renamed to match controller
  getProductById,    // Renamed to match controller
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public Routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin Only Routes
router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
