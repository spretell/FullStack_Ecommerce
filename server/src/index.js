// import express library to create http server
import express from "express";
// import cors middleware to enable cross-origin requests from the frontend
import cors from "cors";
// import dotenv to load environment variables from .env file
import dotenv from "dotenv";
// import route handlers for products and messages
import productsRouter from "./routes/products.js";
import messagesRouter from "./routes/messages.js";

// reads .env file and loads valued into process.env
dotenv.config();

// create express app
const app = express();

// cors adds correct headers so frontend can call the backend
app.use(cors());
// express.json() parses incoming json request bodies and makes them available under req.body in route handlers
app.use(express.json());

// health check route to verify server is running
app.get("/", (req, res) => {
  res.send("Bake Brunch server is running!");
});

// mount routers for products and messages under /api path ; this means that requests to /api/products will be handled by productsRouter and requests to /api/messages will be handled by messagesRouter
app.use("/api/products", productsRouter);
app.use("/api/messages", messagesRouter);

// start the server on the specified port and log a message to the console
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
