import { merge } from "./deep-merge.js"
import { isSimpleType } from "./utils.js"
import { isArray, isObject } from "@halvaradop/ts-utility-types/validate"

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
            clone[key] = merge({}, source[key] as any, "source", false)
        } else if (isArray(source[key])) {
            clone[key] = deepCopyArray(source[key])
        }
    }
    return clone
}
