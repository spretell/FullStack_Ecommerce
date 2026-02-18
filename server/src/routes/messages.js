// import express to create a router for handling message-related API endpoints
import express from "express";
// import database connection pool to execute queries against the database
import pool from "../db.js";

// create a new router instance to define routes related to messages
const router = express.Router();

// POST /api/messages
router.post("/", async (req, res) => {
  try {
    // extract data from request body ( object destructuring )
    const { name, email, topic, order, message, subscribe } = req.body;

    // basic validation
    if (!name?.trim() || !email?.trim() || !topic || !message?.trim()) {
      // if any required field is missing or empty after trimming whitespace , return a 400 Bad Request response with an error message
      return res.status(400).json({ error: "Missing required fields" });
    }

    // checks if the email has a valid format
    const emailOk = /^\S+@\S+\.\S+$/.test(email.trim());
    if (!emailOk) {
      // if the email format is invalid , return a 400 Bad Request response with an error message
      return res.status(400).json({ error: "Invalid email format" });
    }

    // insert the message into the database using a parameterized query to prevent SQL injection ; the values are passed as an array and will replace the ? placeholders in the query
    const [result] = await pool.query(
      `INSERT INTO messages 
       (name, email, topic, order_number, message, subscribe)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        // insert trimmed values for name and email to remove extra whitespace
        name.trim(),
        email.trim(),
        topic,
        // order is optional , so trim it if it exists ; if it's empty after trimming , store null in the database
        order?.trim() || null,
        message.trim(),
        // subscribe is a boolean value ; convert it to 1 for true and 0 for false to store in the database
        subscribe ? 1 : 0,
      ],
    );

    // if the insert is successful , return a 201 Created response with a success message and the id of the new message
    res.status(201).json({
      success: true,
      id: result.insertId,
    });
  } catch (err) {
    // log the error to the console for debugging and send a 500 Internal Server Error response with message
    console.error("Message insert error:", err);
    res.status(500).json({ error: "Could not save message" });
  }
});

// export the router so it can be mounted in the main server file (index.js) under the /api/messages path
export default router;
