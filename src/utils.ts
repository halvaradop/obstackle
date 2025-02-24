import { PrimitiveNullish } from "@halvaradop/ts-utility-types"
import { isFunction, isNullish, isPrimitive } from "@halvaradop/ts-utility-types/validate"

/**
 * Checks whether a value is a simple type or nullish.
 *
 * @param {unknown} value - The value to check.
 * @param {boolean} nullish - Whether to consider null and undefined as simple types.
 * @returns {value is PrimitiveNullish} - Whether the value is a primitive or nullish.
 */
export const isSimpleType = (value: unknown, nullish: boolean): value is PrimitiveNullish => {
    return isPrimitive(value) || (nullish && isNullish(value)) || isFunction(value)
}
