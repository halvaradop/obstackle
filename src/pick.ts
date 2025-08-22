/**
 * Create a new object with only the picked keys.
 *
 * @param {Record<string, unknown>} object - Object to pick from
 * @param {string | string[]} pick - Key or keys to pick from the object
 * @example
 *
 * const user = {
 *   username: "john_doe",
 *   password: "john123",
 *   email: "john_doe@gmail.com"
 * }
 *
 * // Expected: { username: "john_doe", email: "john_doe@gmail.com" }
 * pick(user, ["username", "email"])
 *
 * // Expected: { username: "john_doe" }
 * pick(user, "username")
 */
export const pick = <Obj extends Record<string, unknown>, Keys extends keyof Obj | (keyof Obj)[]>(
    object: Obj,
    pick: Keys,
): Pick<Obj, Keys extends string[] ? Keys[number] & string : Keys & string> => {
    const keys = Array.isArray(pick) ? pick : [pick]
    return Object.keys(object).reduce(
        (previous, now) => ({
            ...previous,
            ...(keys.includes(now as Keys) ? { [now]: object[now] } : {}),
        }),
        {},
    ) as unknown as any
}
