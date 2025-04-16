import { isArray, isObject } from "@halvaradop/ts-utility-types/validate"
import { isSimpleType } from "./utils.js"

export const deepClone = <T extends Record<string, any> | unknown[]>(obj: T, nullish: boolean = true): T => {
    const clone: any = isArray(obj) ? [] : {}
    for (const key in obj) {
        if (isSimpleType(obj[key], nullish)) {
            clone[key] = obj[key]
        } else if (isObject(obj[key])) {
            clone[key] = deepClone(obj[key], nullish)
        } else if (isArray(obj[key])) {
            clone[key] = deepClone(obj[key], nullish)
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
export const deepCopyArray = <Array extends unknown[]>(source: Array, nullish: boolean = true): Array => {
    return deepClone(source, nullish)
}
