import type { DeepKeys, DeepSet } from "@halvaradop/ts-utility-types"
import { isObject } from "@halvaradop/ts-utility-types/validate"
import { deepMerge } from "@/deep.js"
import { getKeyFromPath } from "@/utils.js"

/**
 * @internal
 */
const internalSet = <Obj extends Record<string, unknown>>(obj: Obj, key: DeepKeys<Obj> & string, value: unknown) => {
    const [getKey, path] = getKeyFromPath(key)
    if (!isObject(obj) || getKey === "") {
        return
    }
    if (getKey in obj) {
        if (path === "") {
            // @ts-ignore
            obj[getKey as keyof typeof obj] = value
        } else {
            internalSet(obj[getKey as keyof typeof obj] as Record<string, unknown>, path, value)
        }
    }
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
export const set = <Obj extends Record<string, unknown>, Key extends DeepKeys<Obj> & string, Value extends unknown>(
    obj: Obj,
    key: Key,
    value: Value,
    newCopy: boolean = false
): DeepSet<Obj, Key, Value> => {
    const toSet = (newCopy ? deepMerge(obj, {}) : obj) as Record<string, unknown>
    internalSet(toSet, key, value)
    return toSet as unknown as never
}
