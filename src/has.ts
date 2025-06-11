import { isObject } from "@halvaradop/ts-utility-types/validate"
import { getKeyFromPath } from "./utils.js"

/**
 * Checks if a key exists in an object, including nested objects. For nested objects,
 * the key should be provided in dot notation.
 *
 * @param {Record<string, any>} obj - The object to check for the key.
 * @param {string} key - The key to check for in the object.
 * @returns {boolean} - Returns true if the key exists in the object, false otherwise.
 * @example
 *
 * const user = {
 *   username: "john_doe",
 *   password: "john123",
 *   email: "john_doe@gmail.com",
 *   address: {
 *     street: "123 Main St",
 *     city: "New York",
 *   }
 * }
 *
 * // Expected: true
 * has(user, "username")
 *
 * // Expected: true
 * has(user, "address.street")
 *
 * // Expected: false
 * has(user, "address.zipcode")
 */
export const has = <Obj extends Record<string, any>>(obj: Obj, key: string): boolean => {
    const [getKey, path] = getKeyFromPath(key)
    if (!isObject(obj) || !getKey) {
        return false
    }
    if (getKey in obj) {
        if (path === "") {
            return true
        } else {
            return has(obj[getKey], path)
        }
    }
    return false
}
