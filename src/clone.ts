import { isArray, isObject, isNullish, isPrimitive } from "@halvaradop/ts-utility-types/validate"
import type { DeepNonNullish, FilterNonNullish } from "@halvaradop/ts-utility-types"

/**
 * Creates a deep copy of an object or array. Recursively copies properties, handling nested arrays and objects.
 * If `skip` is true, nullish values (null or undefined) are omitted from the result.
 *
 * @param {Record<string, unknown> | unknown[]} obj - The object or array to deep clone.
 * @param {boolean} skip - If true, skips nullish values in the object or array.
 * @returns {Record<string, unknown> | unknown[]} A deep copy of the object or array, with optional omission of nullish values.
 */
export const deepClone = <T extends Record<string, unknown> | unknown[], Skip extends boolean = false>(
    obj: T,
    skip: Skip = false as Skip
) => {
    const clone = isArray(obj) ? deepCloneArray(obj, skip) : deepCloneObject(obj, skip)
    return clone as Skip extends true ? (T extends unknown[] ? FilterNonNullish<T> : DeepNonNullish<T>) : T
}

/**
 * Creates a deep copy of an array. It recursively copies properties and handles arrays and objects.
 * It can skip nullish values if the `skip` parameter is set to true. It uses the `deepCloneObject`
 * function for objects and is a complement to the `deepClone` function for arrays.
 *
 * @param {unknown[]} source - The source array to copy.
 * @param {boolean} skip - If true, skips nullish values in the array.
 * @returns {unknown[]} - The deep copied array.
 */
export const deepCloneArray = <Arr extends unknown[], Skip extends boolean = false>(source: Arr, skip: Skip = false as Skip) => {
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
    return clone as Skip extends true ? FilterNonNullish<Arr> : Arr
}

/**
 * Creates a deep copy of an object. It recursively copies properties and handles arrays and objects.
 * It can skip nullish values if the `skip` parameter is set to true. It uses the `deepCloneArray`
 * function for arrays and is a complement to the `deepClone` function for objects.
 *
 * @param {Record<string, any>} source - The source object to copy.
 * @param {boolean} skip - If true, skips nullish values in the object.
 * @returns {Record<string, any>} - The deep copied object.
 */
export const deepCloneObject = <Object extends Record<string, unknown>, Skip extends boolean = false>(
    source: Object,
    skip: Skip = false as Skip
) => {
    const clone: Record<string, unknown> = {}
    for (const key in source) {
        const item = source[key]
        if (skip && isNullish(item)) continue
        if (isPrimitive(item) || (isNullish(item) && !skip)) {
            clone[key] = item
        } else if (isArray(item)) {
            clone[key] = deepCloneArray(item, skip)
        } else if (isObject(item)) {
            clone[key] = deepCloneObject(item as Record<string, unknown>, skip)
        }
    }
    return clone as Skip extends true ? DeepNonNullish<Object> : Object
}
