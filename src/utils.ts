import { PrimitiveNullish } from "@halvaradop/ts-utility-types"
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
