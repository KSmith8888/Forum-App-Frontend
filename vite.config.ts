import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react()],
    build: {
        target: ["es2021", "edge88", "firefox98", "chrome87", "safari15.4"],
        assetsInlineLimit: 0,
        rollupOptions: {
            output: {
                manualChunks: (id: string) => {
                    if (id.includes("node_modules")) {
                        if (id.includes("router")) {
                            return "vendor_router";
                        } else {
                            return "vendor_react";
                        }
                    }
                },
            },
        },
    },
});
