import { baseConfig } from "@halvaradop/eslint-config/base"
import { prettierConfig } from "@halvaradop/eslint-config/prettier"
import { tsConfig } from "@halvaradop/eslint-config/typescript"

export default [...baseConfig, ...prettierConfig, ...tsConfig]
