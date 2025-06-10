import { isArray, isObject, isNullish, isPrimitive } from "@halvaradop/ts-utility-types/validate"
import { DeepNonNullish, FilterNonNullish } from "@halvaradop/ts-utility-types"
import { isPrimitiveOrFunction } from "./utils.js"

export const deepClone = <T extends Record<string, any> | unknown[], Skip extends boolean = false>(
    obj: T,
    skip: Skip = false as Skip,
) => {
    return isArray(obj) ? deepCloneArray(obj, skip) : deepCloneObject(obj, skip)
}

/**
 * Creates a deep copy of an array. It uses the `merge` function to copy objects and arrays.
 *
 * @param {unknown[]} source - The source array to copy.
 * @returns {unknown[]} - The deep copied array.
 */
export const deepCloneArray = <Array extends unknown[], Skip extends boolean = false>(
    source: Array,
    skip: Skip = false as Skip,
) => {
    const clone: unknown[] = []
    for (const item of source) {
        if (skip && isNullish(item)) continue
        if (isPrimitive(item) || (isNullish(item) && !skip)) {
            clone.push(item)
        } else if (isArray(item)) {
            clone.push(deepCloneArray(item, skip))
        } else if (isObject(item)) {
            clone.push(deepCloneObject(item, skip))
        }
    }
    return clone
}

export const deepCloneObject = <Object extends Record<string, any>, Skip extends boolean = false>(
    source: Object,
    skip: Skip = false as Skip,
) => {
    const clone: Record<string, any> = {}
    for (const key in source) {
        const item = source[key]
        if (skip && isNullish(item)) continue
        if (isPrimitive(item) || (isNullish(item) && !skip)) {
            clone[key] = item
        } else if (isArray(item)) {
            clone[key] = deepCloneArray(item, skip)
        } else if (isObject(item)) {
            clone[key] = deepCloneObject(item, skip)
        }
    }
    return clone
}
