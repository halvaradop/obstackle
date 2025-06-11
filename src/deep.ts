import { isObject, isArray, isNullish } from "@halvaradop/ts-utility-types/validate"
import { DeepMerge, DeepNonNullish } from "@halvaradop/ts-utility-types/deep"
import { isPrimitiveOrFunction } from "@/utils.js"
import { deepOmit } from "@/omit.js"
import { deepCloneArray } from "@/clone.js"

/**
 * Merges two objects in any depth recursively, by default the source object has priority over
 * the target object. If the `priorityObjects` parameter is set to `true`, the object values will
 * have the priority over primitive values.
 *
 * @param {object} source - The first object to merge.
 * @param {object} target - The second object to merge.
 * @param {string} priorityObjects - The priority of the mere
 * @param {boolean} skip - If true, skips nullish values in the object.
 * @returns The merged object.
 *
 * @example
 * // Expected: { a: 1, b: { c: 2, d: 3 }, c: 4 }
 * deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, c: 4 })
 */
export const deepMerge = <
    Source extends Record<string, unknown>,
    Target extends Record<string, unknown>,
    PriorityObjects extends boolean = false,
    Skip extends boolean = false,
>(
    source: Source,
    target: Target,
    priorityObjects: PriorityObjects = false as PriorityObjects,
    skip: Skip = false as Skip,
): Skip extends true
    ? DeepNonNullish<DeepMerge<Source, Target, false, PriorityObjects>>
    : DeepMerge<Source, Target, false, PriorityObjects> => {
    const clone: any = {}
    for (const key in source) {
        if (skip && isNullish(source[key])) continue
        if (isPrimitiveOrFunction(source[key], skip)) {
            clone[key] = source[key]
        } else if (isObject(source[key])) {
            clone[key] = deepMerge(
                source[key] as Record<string, unknown>,
                (target[key] ?? {}) as Record<string, unknown>,
                priorityObjects,
                skip,
            )
        } else if (isArray(source[key])) {
            clone[key] = deepCloneArray(source[key], skip)
        }
    }
    for (const key in target) {
        if (skip && isNullish(target[key])) continue
        if (!(key in clone)) {
            if (isPrimitiveOrFunction(target[key], skip)) {
                clone[key] = target[key]
            } else if (isObject(target[key])) {
                clone[key] = deepMerge({}, target[key] as any, priorityObjects, skip)
            } else if (isArray(target[key])) {
                clone[key] = deepCloneArray(target[key], skip)
            }
        } else if (key in clone && priorityObjects && isObject(target[key]) && !isObject(clone[key])) {
            clone[key] = deepMerge({}, target[key] as Record<string, unknown>, priorityObjects, skip)
        }
    }
    return clone
}

export { deepOmit }
