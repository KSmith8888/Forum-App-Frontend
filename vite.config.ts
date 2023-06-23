import react from "@vitejs/plugin-react";
import { splitVendorChunkPlugin } from "vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react(), splitVendorChunkPlugin()],
    build: {
        target: ["es2021", "edge88", "firefox98", "chrome87", "safari15.4"],
    },
});
