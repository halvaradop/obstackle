import { DeepKeys, DeepGet } from "@halvaradop/ts-utility-types"
import { isObject } from "@halvaradop/ts-utility-types/validate"
import { getKeyFromPath } from "@/utils.js"

/**
 *  @internal
 */
const internalGet = <Obj extends Record<string, unknown>, Keys extends DeepKeys<Obj>>(
    object: Obj,
    key: Keys,
): DeepGet<Obj, Keys & string> | undefined => {
    const [getKey, path] = getKeyFromPath(key as string)
    if (!isObject(object) || !getKey) {
        return undefined
    }
    if (getKey in object) {
        if (path === "") {
            return object[getKey] as unknown as never
        } else {
            return internalGet(object[getKey] as Record<string, unknown>, path) as unknown as never
        }
    }
}

/**
 * Get a value from an object using a dot-separated path.
 *
 * @param {Record<string, unknown>} object - The object to search in.
 * @param {DeepKeys<Object>} keys - The dot-separated path to the value.
 * @param {unknown} defaultValue - The default value to return if the key is not found.
 * @returns {DeepPick<Obj, Keys>} The value at the specified path or the default value if not found.
 * @example
 *
 * const obj = {
 *   foo: {
 *     bar: {
 *       fizz: "buzz",
 *     }
 *   }
 * }
 *
 * // Expected: "buzz"
 * const value = get(obj, "foo.bar.fizz")
 *
 * // Expected: "default"
 * const value = get(obj, "foo.bar.baz", "default")
 *
 */
export const get = <Obj extends Record<string, unknown>, Keys extends DeepKeys<Obj>, Default = undefined>(
    object: Obj,
    keys: Keys,
    defaultValue?: Default,
): DeepGet<Obj, Keys & string> => {
    return (internalGet(object, keys) ?? defaultValue) as unknown as never
}
