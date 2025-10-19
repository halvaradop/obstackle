import type { PrimitiveNullish } from "@halvaradop/ts-utility-types"
import { isFunction, isNullish, isPrimitive } from "@halvaradop/ts-utility-types/validate"

/**
 * Checks whether a value is a primitive or function. If withNullish is true, also returns true for nullish values.
 *
 * @param {unknown} value - The value to check.
 * @param {boolean} withNullish - Whether to consider null and undefined as valid.
 * @returns {boolean} - Whether the value is a primitive, function, or (if withNullish) nullish.
 */
export const isPrimitiveOrFunction = (value: unknown, withNullish: boolean): value is PrimitiveNullish => {
    return isPrimitive(value) || isFunction(value) || (isNullish(value) && withNullish)
}

/**
 * Splits a dot-separated path into the first key and the remaining path.
 * Returns a tuple: [firstKey, restOfPath]. If there is no dot, restOfPath is an empty string.
 *
 * @param {string} path - The dot-separated path string.
 * @returns {[string, string]} - Tuple of [firstKey, restOfPath].
 */
export const getKeyFromPath = (path: string): [string, string] => {
    if (path === "") return ["", ""]
    const dotIndex = path.indexOf(".")
    if (dotIndex === -1) {
        return [path, ""]
    }
    return [path.substring(0, dotIndex), path.substring(dotIndex + 1)]
}
