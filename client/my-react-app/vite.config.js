import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // This sets the port to 5174
    historyApiFallback: true, // Ensures React Router handles routes
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
