import { PrimitiveNullish } from "@halvaradop/ts-utility-types/types"
import { isPrimitive, isNullish, isObject, isFunction, isArray } from "@halvaradop/ts-utility-types/validate"

/**
 * Merges two objects in any depth recursively.
 *
 * @param {object} source - The first object to merge.
 * @param {object} target - The second object to merge.
 * @param {string} priority - The priority of the merge. It can be "source", "target", or "object".
 * @returns The merged object.
 *
 * @example
 * // Expected: { a: 1, b: { c: 2, d: 3 }, c: 4 }
 * merge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, c: 4 })
 */
export const merge = <S extends Record<string, unknown>, T extends Record<string, unknown>>(
    source: S,
    target: T,
    priority: "source" | "target" | "object" = "source",
    nullish: boolean = false,
) => {
    const clone: any = {}
    const priorityOne = priority === "source" ? source : target
    const priorityTwo = priority === "source" ? target : source
    for (const key in priorityOne) {
        if (isSimpleType(priorityOne[key], nullish)) {
            clone[key] = priorityOne[key]
        } else if (isObject(priorityOne[key])) {
            if (priority == "source") {
                clone[key] = merge(priorityOne[key] as any, (priorityTwo[key] ?? {}) as any, priority, nullish)
            } else {
                clone[key] = merge((priorityTwo[key] ?? {}) as any, priorityOne[key] as any, priority, nullish)
            }
        } else if (isArray(priorityOne[key])) {
            clone[key] = deepCopyArray(priorityOne[key])
        }
    }
    for (const key in priorityTwo) {
        if (!(key in clone)) {
            if (isSimpleType(priorityTwo[key], nullish)) {
                clone[key] = priorityTwo[key]
            } else if (isObject(priorityTwo[key])) {
                clone[key] = merge({}, priorityTwo[key] as any, priority, nullish)
            } else if (isArray(priorityTwo[key])) {
                clone[key] = deepCopyArray(priorityTwo[key])
            }
        }
    }
    return clone
}

/**
 * Creates a deep copy of an array.
 *
 * @param {unknown[]} source - The source array to copy.
 * @returns {unknown[]} - The deep copied array.
 */
const deepCopyArray = <Array extends unknown[]>(source: Array): Array => {
    const clone: any = []
    for (const key in source) {
        if (isSimpleType(source[key], false)) {
            clone[key] = source[key]
        } else if (isObject(source[key])) {
            clone[key] = merge({}, source[key] as any, "source", false)
        } else if (isArray(source[key])) {
            clone[key] = deepCopyArray(source[key])
        }
    }
    return clone
}

/**
 * Checks whether a value is a simple type or nullish.
 *
 * @param {unknown} value - The value to check.
 * @param {boolean} nullish - Whether to consider null and undefined as simple types.
 * @returns {value is PrimitiveNullish} - Whether the value is a primitive or nullish.
 */
const isSimpleType = (value: unknown, nullish: boolean): value is PrimitiveNullish => {
    return isPrimitive(value) || (nullish && isNullish(value)) || isFunction(value)
}
