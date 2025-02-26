import { isArray } from "@halvaradop/ts-utility-types/validate"
import { deepMerge } from "./deep.js"

/**
 * Omit properties from an object by key or keys of the first level of the object.
 * If the deep flag is set to true, it will create a deep copy of the object without
 * the omitted properties. The keys to be omitted are located in the first level of the object.
 *
 * @param {Record<string, unknown>} object - The object to omit properties.
 * @param {string | string[]} exclude - The key or keys to omit from the object.
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
    exclude: Keys,
    deep: boolean = false,
): Omit<Obj, Keys & string> => {
    const keys = isArray(exclude) ? exclude : [exclude]
    const omitted = Object.keys(object).reduce(
        (previous, now) => ({
            ...previous,
            ...(keys.includes(now as Keys) ? {} : { [now]: object[now] }),
        }),
        {},
    )
    return deep ? deepMerge(omitted, {}) : omitted
}
