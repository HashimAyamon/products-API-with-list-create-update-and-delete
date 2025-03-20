const pool = require("../config/db");

const createUser = async (userData) => {
  const {
    first_name,
    last_name,
    dob,
    address,
    place,
    city,
    district,
    state,
    email,
    phone,
    password,
    role,
  } = userData;

  const query = `
        INSERT INTO users (first_name, last_name, dob, address, place, city, district, state, email, phone, password, role) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
        RETURNING id, first_name, last_name, email, phone, role`;

  const values = [
    first_name,
    last_name,
    dob,
    address,
    place,
    city,
    district,
    state,
    email,
    phone,
    password,
    role || "customer",
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      "SELECT id, first_name, last_name, email, phone, password FROM users WHERE email = $1",
      [email]
    );
    console.log("Fetched User Data:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error("Database Query Error:", error);
    throw error;
  }
};

module.exports = { createUser, findUserByEmail };
