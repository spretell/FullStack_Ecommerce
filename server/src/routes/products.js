// import express to create a router for handling product-related API endpoints
import express from "express";
// import database connection pool to execute queries against the database
import pool from "../db.js";

// create a new router instance to define routes related to products
const router = express.Router();

// GET /api/products
// async function to handle requests to get all products from the database
router.get("/", async (req, res) => {
  try {
    // execute a SQL query to select all rows from the products table ; pool.query returns an array where the first element is the array of rows
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    // log the error to the console for debugging and send a 500 Internal Server Error response with message
    console.error("DB error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// export the router so it can be mounted in the main server file (index.js) under the /api/products path
export default router;
