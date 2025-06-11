import { describe, expectTypeOf, test } from "vitest"
import { pick } from "../src/pick"
import { mockUser } from "./testcases"

describe("pick", () => {
    const testCases = [
        {
            description: "should pick a single key from the object",
            input: mockUser,
            pick: "username",
            expected: {
                username: "john_doe",
            },
        },
        {
            description: "should pick a single key from the object using an array",
            input: mockUser,
            pick: ["username"],
            expected: {
                username: "john_doe",
            },
        },
        {
            description: "should pick multiple keys from the object",
            input: mockUser,
            pick: ["username", "phones"],
            expected: {
                username: "john_doe",
                phones: {
                    home: "1234567890",
                    work: "0987654321",
                },
            },
        },
        {
            description: "should pick a nested object from the object",
            input: mockUser,
            pick: ["address"],
            expected: {
                address: {
                    city: "New York",
                    zip: "10001",
                    coordinates: {
                        lat: 40.7128,
                        long: -74.006,
                    },
                },
            },
        },
        {
            description: "should pick multiple nested objects from the object",
            input: mockUser,
            pick: ["address", "phones"],
            expected: {
                address: {
                    city: "New York",
                    zip: "10001",
                    coordinates: {
                        lat: 40.7128,
                        long: -74.006,
                    },
                },
                phones: {
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
        expectTypeOf(pick(mockUser, "username")).toEqualTypeOf<Pick<typeof mockUser, "username">>()
        expectTypeOf(pick(mockUser, ["address"])).toEqualTypeOf<Pick<typeof mockUser, "address">>()
        expectTypeOf(pick(mockUser, ["address", "phones"])).toEqualTypeOf<Pick<typeof mockUser, "address" | "phones">>()
        expectTypeOf(pick(mockUser, ["address", "phones", "meta"])).toEqualTypeOf<
            Pick<typeof mockUser, "address" | "phones" | "meta">
        >()
    })
})
