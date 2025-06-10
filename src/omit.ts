import { isArray, isObject } from "@halvaradop/ts-utility-types/validate"
import type { DeepKeys, DeepOmit, LiteralUnion } from "@halvaradop/ts-utility-types"
import type { ArgumentKeys } from "./types.js"
import { deepMerge } from "./deep.js"

/**
 * Omit properties from an object by key or keys of the first level of the object.
 * If the deep flag is set to true, it will create a deep copy of the object without
 * the omitted properties. The keys to be omitted are located in the first level of the object.
 *
 * @param {Record<string, unknown>} object - The object to omit properties.
 * @param {string | string[]} omit - The key or keys to omit from the object.
 * @param {boolean} deep - if true returns a deep copy of the object otherwise a shallow copy.
 * @returns {Omit<Obj, Keys & keyof Obj>} - The object without the omitted properties.
 * @example
 *
 * const user = {
 *   username: "john_doe",
 *   password: "john123",
 *   email: "john_doe@gmail.com"
 * }
 *
 * // Expected: { username: "john_doe", email: "john_doe@gmail.com" }
 * omit(user, "password")
 *
 * // Expected: { username: "john_doe", email: "john_doe@gmail.com" }
 * omit(user, ["password"])
 */
export const omit = <Obj extends Record<string, unknown>, Keys extends keyof Obj | (keyof Obj)[]>(
    object: Obj,
    omit: Keys,
    deep: boolean = false,
): Omit<Obj, ArgumentKeys<Keys>> => {
    const keys = isArray(omit) ? omit : [omit]
    const omitted = Object.keys(object).reduce(
        (previous, now) => ({
            ...previous,
            ...(keys.includes(now as Keys) ? {} : { [now]: object[now] }),
        }),
        {},
    )
    return deep ? (deepMerge(omitted, {}) as Omit<Obj, ArgumentKeys<Keys>>) : (omitted as Omit<Obj, ArgumentKeys<Keys>>)
}

/**
 * @internal
 */
const internalDeepOmit = <
    Obj extends Record<string, unknown>,
    Keys extends LiteralUnion<DeepKeys<Obj> & string, string> | LiteralUnion<DeepKeys<Obj> & string, string>[],
>(
    object: Obj,
    omit: Keys,
    path: string,
): DeepOmit<Obj, ArgumentKeys<Keys>> => {
    const omitKeys = isArray(omit) ? omit : [omit]
    const clone: any = {}
    for (const key in object) {
        const currentPath = path.length > 0 ? `${path}.${key}` : key
        if (omitKeys.includes(currentPath as Keys)) {
            continue
        } else if (isObject(object[key])) {
            clone[key] = internalDeepOmit(object[key] as any, omitKeys as any, currentPath)
        } else {
            clone[key] = object[key]
        }
    }
    return clone satisfies DeepOmit<Obj, ArgumentKeys<Keys>>
}

/**
 * @unstable
 * The returned type is not accurate. It should be fixed in the next release
 * of @halvaradop/ts-utility-types
 *
 * Omit properties from an object at any depth by the provided key or keys.
 * The keys to be omitted can be located at any depth within the object. The
 * keys provided should be concatenated with a dot to represent the path to
 * the key in the object.
 *
 * This function is an advanced version of the `omit` function.
 *
 * @param {Record<string, unknown>} object - The object from which properties will be omitted.
 * @param {DeepKeys<object> | DeepKeys<object>[]} omit - The key or keys to omit from the object.
 * @returns {Omit<DeepKeys<Obj>, Keys & keyof Obj>} - The object without the omitted properties.
 */
export const deepOmit = <
    Obj extends Record<string, unknown>,
    Keys extends LiteralUnion<DeepKeys<Obj> & string, string> | LiteralUnion<DeepKeys<Obj> & string, string>[],
>(
    object: Obj,
    omit: Keys,
): DeepOmit<Obj, ArgumentKeys<Keys, string>> => {
    return internalDeepOmit(object, omit, "") as DeepOmit<Obj, ArgumentKeys<Keys, string>>
}
