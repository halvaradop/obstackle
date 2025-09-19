import { defineConfig } from "tsup"
import tsupConfig from "@halvaradop/tsup-config"

export default defineConfig({
    ...tsupConfig,
    entry: ["src"],
})
