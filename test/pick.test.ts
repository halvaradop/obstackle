import { describe, expectTypeOf, test } from "vitest"
import { pick } from "../src/pick"

describe("pick", () => {
    const testCases = [
        {
            description: "should pick a single key from the object",
            input: {
                username: "john_doe",
                password: "john123",
            },
            pick: "username",
            expected: {
                username: "john_doe",
            },
        },
        {
            description: "should pick a single key from the object using an array",
            input: {
                username: "john_doe",
                password: "john123",
            },
            pick: ["username"],
            expected: {
                username: "john_doe",
            },
        },
        {
            description: "should pick multiple keys from the object",
            input: {
                username: "john_doe",
                password: "john123",
            },
            pick: ["username", "password"],
            expected: {
                username: "john_doe",
                password: "john123",
            },
        },
        {
            description: "should pick a nested object from the object",
            input: {
                username: "john_doe",
                address: {
                    city: "New York",
                    country: "USA",
                },
                phone: {
                    home: "1234567890",
                    work: "0987654321",
                },
            },
            pick: ["address"],
            expected: {
                address: {
                    city: "New York",
                    country: "USA",
                },
            },
        },
        {
            description: "should pick multiple nested objects from the object",
            input: {
                username: "john_doe",
                address: {
                    city: "New York",
                    country: "USA",
                },
                phone: {
                    home: "1234567890",
                    work: "0987654321",
                },
            },
            pick: ["address", "phone"],
            expected: {
                address: {
                    city: "New York",
                    country: "USA",
                },
                phone: {
                    home: "1234567890",
                    work: "0987654321",
                },
            },
        },
    ]

    testCases.forEach(({ description, input, pick: pickedKeys, expected }) => {
        test.concurrent(description, ({ expect }) => {
            expect(pick(input, pickedKeys as keyof typeof input)).toEqual(expected)
        })
    })

    test("check the return type of pick", () => {
        const user = {
            username: "john_doe",
            address: {
                city: "New York",
                country: "USA",
            },
            phone: {
                home: "1234567890",
                work: "0987654321",
            },
        }
        expectTypeOf(pick(user, "username")).toEqualTypeOf<Pick<typeof user, "username">>()
        expectTypeOf(pick(user, ["address"])).toEqualTypeOf<Pick<typeof user, "address">>()
        expectTypeOf(pick(user, ["address", "phone"])).toEqualTypeOf<Pick<typeof user, "address" | "phone">>()
    })
})
