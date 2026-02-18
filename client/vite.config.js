// import defineConfig to give better TypeScript support and react plugin for Vite to handle React files
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// exports the configuration object for Vite
export default defineConfig({
  // tells Vite to use the react plugin to handle .jsx files
  plugins: [react()],
  // server settings
  server: {
    // whenever the frontend makes a request to a path that starts with /api , proxy it to the backend server
    proxy: {
      "/api": {
        // the backend server is running on localhost port 5001
        target: "http://127.0.0.1:5001",
        // modifies the request header to match the target server's origin
        changeOrigin: true,
      },
    },
  },
});
