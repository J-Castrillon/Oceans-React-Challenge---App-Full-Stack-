import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailiwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailiwindcss()],
  server: {
    port: 9000,
  },
});
