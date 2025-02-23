const pool = require('../config/db');



const getProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const createProduct = async (req, res) => {
    try {
        const { title, image, price, offerPrice } = req.body;
        const result = await pool.query(
            'INSERT INTO products (title, image, price, offer_price) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, image, price, offerPrice]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, image, price, offerPrice } = req.body;

        const result = await pool.query(
            'UPDATE products SET title = $1, image = $2, price = $3, offer_price = $4 WHERE id = $5 RETURNING *',
            [title, image, price, offerPrice, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
