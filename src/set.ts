import { DeepKeys } from "@halvaradop/ts-utility-types"
import { isObject } from "@halvaradop/ts-utility-types/validate"
import { deepMerge } from "./deep.js"

/**
 * @internal
 */
const internalSet = <Obj extends Record<string, any>>(obj: Obj, key: DeepKeys<Obj> & string, value: any) => {
    const split = key.split(".")
    const startKey = split[0]
    const rightKeys = split.slice(1).join(".")
    Object.keys(obj).forEach((entryKey) => {
        if (startKey === entryKey) {
            if (rightKeys.length === 0) {
                obj[entryKey as keyof Obj] = value
            } else {
                if (isObject(obj[entryKey as keyof Obj])) {
                    internalSet(obj[entryKey as keyof Obj], rightKeys as any, value)
                }
            }
        }
    })
}

/**
 * Sets a value in an object at a given path.
 *
 * @param {Record<string, any>} obj - The object to set the value in.
 * @param {string} key - The path to set the value at.
 * @param {any} value - The value to set.
 * @param {boolean} newCopy - Whether to return a new copy of the object or not. Defaults to false.
 * @returns The modified object.
 * @example
 *
 * const obj = {
 *   foo: "bar",
 *   bar: {
 *     foofoo: "barfoo",
 *     barbar: {
 *       bar: "barbar",
 *     }
 *   }
 * }
 *
 * // Expected:
 * {
 *   foo: "bar",
 *   bar: {
 *     foofoo: "barfoo",
 *     barbar: {
 *       bar: "newBar",
 *     }
 *   }
 * }
 * const newObj = set(obj, "bar.barbar.bar", "newBar", true)
 *
 */
export const set = <Obj extends Record<string, any>>(
    obj: Obj,
    key: DeepKeys<Obj> & string,
    value: any,
    newCopy: boolean = false,
) => {
    internalSet(obj, key, value)
    return newCopy ? deepMerge(obj, {}) : obj
}
