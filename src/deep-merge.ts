import { isObject, isArray } from "@halvaradop/ts-utility-types/validate"
import { deepCopyArray } from "./deep-copy-array.js"
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
