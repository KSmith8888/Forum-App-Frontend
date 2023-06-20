import react from "@vitejs/plugin-react";
import { splitVendorChunkPlugin } from "vite";
import { defineConfig } from "vite";

export default defineConfig({
    base: "./",
    plugins: [react(), splitVendorChunkPlugin()],
    build: {
        target: "es2021",
    },
});
