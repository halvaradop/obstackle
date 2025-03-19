import { isObject, isArray } from "@halvaradop/ts-utility-types/validate"
import { isSimpleType } from "./utils.js"
import { deepOmit } from "./omit.js"
import type { Merge as DeepMerge } from "@halvaradop/ts-utility-types/objects"

/**
 * Merges two objects in any depth recursively, by default the source object has priority over
 * the target object. If the `priorityObjects` parameter is set to `true`, the object values will
 * have the priority over primitive values.
 *
 * @param {object} source - The first object to merge.
 * @param {object} target - The second object to merge.
 * @param {string} priorityObjects - The priority of the mere
 * @returns The merged object.
 *
 * @example
 * // Expected: { a: 1, b: { c: 2, d: 3 }, c: 4 }
 * deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, c: 4 })
 */
export const deepMerge = <Source extends Record<string, unknown>, Target extends Record<string, unknown>>(
    source: Source,
    target: Target,
    priorityObjects: boolean = false,
    nullish: boolean = false,
): DeepMerge<Source, Target, false, typeof priorityObjects> => {
    const clone: any = {}
    for (const key in source) {
        if (isSimpleType(source[key], nullish)) {
            clone[key] = source[key]
        } else if (isObject(source[key])) {
            clone[key] = deepMerge(source[key] as any, (target[key] ?? {}) as any, priorityObjects, nullish)
        } else if (isArray(source[key])) {
            clone[key] = deepCopyArray(source[key])
        }
    }
    for (const key in target) {
        if (!(key in clone)) {
            if (isSimpleType(target[key], nullish)) {
                clone[key] = target[key]
            } else if (isObject(target[key])) {
                clone[key] = deepMerge({}, target[key] as any, priorityObjects, nullish)
            } else if (isArray(target[key])) {
                clone[key] = deepCopyArray(target[key])
            }
        }
    }
    return clone
}

/**
 * Creates a deep copy of an array. It uses the `merge` function to copy objects and arrays.
 *
 * @param {unknown[]} source - The source array to copy.
 * @returns {unknown[]} - The deep copied array.
 */
export const deepCopyArray = <Array extends unknown[]>(source: Array): Array => {
    const clone: any = []
    for (const key in source) {
        if (isSimpleType(source[key], false)) {
            clone[key] = source[key]
        } else if (isObject(source[key])) {
            clone[key] = deepMerge(source[key] as any, {}, true, false)
        } else if (isArray(source[key])) {
            clone[key] = deepCopyArray(source[key])
        }
    }
    return clone
}

export { deepOmit }
