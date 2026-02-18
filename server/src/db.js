// import mysql2/promise to create a connection pool for interacting with the MySQL database using promises
import mysql from "mysql2/promise";
// import dotenv to load environment variables from .env file
import dotenv from "dotenv";

// reads .env file and loads valued into process.env
dotenv.config();

// create the connection pool
const pool = mysql.createPool({
  // where database is hosted
  host: process.env.DB_HOST,
  // database username
  user: process.env.DB_USER,
  // database password
  password: process.env.DB_PASSWORD,
  // name of the specific database to use
  database: process.env.DB_NAME,
  // if all connections are in use , wait for one to be released instead of throwing an error
  waitForConnections: true,
  // maximum number of connections in the pool
  connectionLimit: 10,
});

// export the pool so it can be imported and used in other parts of the server to execute database queries
export default pool;
