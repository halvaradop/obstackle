import { isArray, isObject, isNullish, isPrimitive } from "@halvaradop/ts-utility-types/validate"
import { DeepNonNullish, FilterNonNullish } from "@halvaradop/ts-utility-types"

/**
 * Creates a deep copy of an object or array. Recursively copies properties, handling nested arrays and objects.
 * If `skip` is true, nullish values (null or undefined) are omitted from the result.
 *
 * @param {Record<string, any> | unknown[]} obj - The object or array to deep clone.
 * @param {boolean} skip - If true, skips nullish values in the object or array.
 * @returns {Record<string, any> | unknown[]} A deep copy of the object or array, with optional omission of nullish values.
 */
export const deepClone = <T extends Record<string, any> | unknown[], Skip extends boolean = false>(
    obj: T,
    skip: Skip = false as Skip,
): Skip extends true ? (T extends unknown[] ? FilterNonNullish<T> : DeepNonNullish<T>) : T => {
    const clone = isArray(obj) ? deepCloneArray(obj, skip) : deepCloneObject(obj, skip)
    return clone as unknown as any
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
export const deepCloneArray = <Array extends unknown[], Skip extends boolean = false>(
    source: Array,
    skip: Skip = false as Skip,
): Skip extends true ? FilterNonNullish<Array> : Array => {
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
    return clone as unknown as any
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
export const deepCloneObject = <Object extends Record<string, any>, Skip extends boolean = false>(
    source: Object,
    skip: Skip = false as Skip,
): Skip extends true ? DeepNonNullish<Object> : Object => {
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
    return clone as unknown as any
}
