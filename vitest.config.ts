import { fileURLToPath } from "url"
import { defineConfig } from "vitest/config"

export default defineConfig({
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    test: {
        coverage: {
            include: ["src/**/*.ts"],
            reporter: ["html", "text", "json"]
        }
    }
})
