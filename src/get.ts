import { DeepKeys, DeepPick, LiteralUnion } from "@halvaradop/ts-utility-types"
import { isObject } from "@halvaradop/ts-utility-types/validate"

const internalGet = <Obj extends Record<string, unknown>, Keys extends DeepKeys<Obj>>(
    object: Obj,
    keys: Keys,
    path: string = "",
): DeepPick<Obj, LiteralUnion<Keys & string>> | undefined => {
    for (const key in object) {
        const currentPath = path ? `${path}.${key}` : key
        if (currentPath === keys) {
            return object[key] as DeepPick<Obj, LiteralUnion<Keys & string>>
        } else if (isObject(object[key])) {
            const deeps = internalGet(object[key] as Record<string, unknown>, keys as string, currentPath)
            if (deeps) {
                return deeps as DeepPick<Obj, LiteralUnion<Keys & string>>
            }
        }
    }
    return undefined
}

/**
 * Get a value from an object using a dot-separated path.
 *
 * @param {Record<string, unknown>} object - The object to search in.
 * @param {DeepKeys<Object>} keys - The dot-separated path to the value.
 * @param {unknown} defaultValue - The default value to return if the key is not found.
 * @returns {DeepPick<Obj, LiteralUnion<Keys & string>>} The value at the specified path or the default value if not found.
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
export const get = <Obj extends Record<string, unknown>, Keys extends DeepKeys<Obj>>(
    object: Obj,
    keys: Keys,
    defaultValue?: unknown,
): DeepPick<Obj, LiteralUnion<Keys & string>> | unknown => {
    return internalGet(object, keys) ?? defaultValue
}
