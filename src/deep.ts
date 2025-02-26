import { isObject, isArray } from "@halvaradop/ts-utility-types/validate"
import { isSimpleType } from "./utils.js"

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
 * deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, c: 4 })
 */
export const deepMerge = <S extends Record<string, unknown>, T extends Record<string, unknown>>(
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
                clone[key] = deepMerge(priorityOne[key] as any, (priorityTwo[key] ?? {}) as any, priority, nullish)
            } else {
                clone[key] = deepMerge((priorityTwo[key] ?? {}) as any, priorityOne[key] as any, priority, nullish)
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
                clone[key] = deepMerge({}, priorityTwo[key] as any, priority, nullish)
            } else if (isArray(priorityTwo[key])) {
                clone[key] = deepCopyArray(priorityTwo[key])
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
            clone[key] = deepMerge({}, source[key] as any, "source", false)
        } else if (isArray(source[key])) {
            clone[key] = deepCopyArray(source[key])
        }
    }
    return clone
}
