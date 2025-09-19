import { describe, expectTypeOf, test } from "vitest"
import type { DeepOmit } from "@halvaradop/ts-utility-types"
import { mockUser } from "./testcases.js"
import { omit, deepOmit } from "@/omit.js"

interface TestCase {
    description: string
    input: Record<string, unknown>
    omit: string | string[]
    expected: Record<string, unknown>
}

describe("omit", () => {
    const testCases = [
        {
            description: "should omit a single top-level property",
            input: {
                username: "john_doe",
                password: "john123",
            },
            omit: "password",
            deep: false,
            expected: {
                username: "john_doe",
            },
        },
        {
            description: "should omit a single nested property without deep omit",
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
            omit: "phone",
            deep: false,
            expected: {
                username: "john_doe",
                address: {
                    city: "New York",
                    country: "USA",
                },
            },
        },
        {
            description: "should omit a single nested property with deep omit",
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
            omit: "phone",
            deep: false,
            expected: {
                username: "john_doe",
                address: {
                    city: "New York",
                    country: "USA",
                },
            },
        },
        {
            description: "should omit multiple top-level properties without deep omit",
            input: {
                firstname: "john",
                lastname: "doe",
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
            omit: ["phone", "address"],
            deep: false,
            expected: {
                firstname: "john",
                lastname: "doe",
                username: "john_doe",
            },
        },
        {
            description: "should omit multiple nested properties with deep omit",
            input: {
                firstname: "john",
                lastname: "doe",
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
            omit: ["phone", "address"],
            deep: true,
            expected: {
                firstname: "john",
                lastname: "doe",
                username: "john_doe",
            },
        },
    ]

    testCases.forEach(({ description, input, omit: omitKeys, deep, expected }) => {
        test.concurrent(description, ({ expect }) => {
            const actual = omit(input, omitKeys as keyof typeof input, deep)
            expect(actual).toEqual(expected)
        })
    })

    test("type checking", () => {
        expectTypeOf(omit(mockUser, "username")).toEqualTypeOf<Omit<typeof mockUser, "username">>()
        expectTypeOf(omit(mockUser, "address")).toEqualTypeOf<Omit<typeof mockUser, "address">>()
        expectTypeOf(omit(mockUser, "tokens")).toEqualTypeOf<Omit<typeof mockUser, "tokens">>()
        expectTypeOf(omit(mockUser, "phones")).toEqualTypeOf<Omit<typeof mockUser, "phones">>()
        expectTypeOf(omit(mockUser, ["phones"])).toEqualTypeOf<Omit<typeof mockUser, "phones">>()
        expectTypeOf(omit(mockUser, ["username", "tokens", "phones"])).toEqualTypeOf<
            Omit<typeof mockUser, "username" | "tokens" | "phones">
        >()
    })
})

describe("deepOmit", () => {
    const testCases: TestCase[] = [
        {
            description: "should omit a single top-level property",
            input: mockUser,
            omit: "username",
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
                tokens: [1, 2, 3, 4],
                active: true,
                meta: null as null | { created: string },
            },
        },
        {
            description: "should omit multiple nested properties",
            input: mockUser,
            omit: ["username", "phones.work"],
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
                },
                tokens: [1, 2, 3, 4],
                active: true,
                meta: null as null | { created: string },
            },
        },
        {
            description: "should omit multiple top-level and nested properties",
            input: mockUser,
            omit: ["username", "phones"],
            expected: {
                address: {
                    city: "New York",
                    zip: "10001",
                    coordinates: {
                        lat: 40.7128,
                        long: -74.006,
                    },
                },
                tokens: [1, 2, 3, 4],
                active: true,
                meta: null as null | { created: string },
            },
        },
        {
            description: "should omit deeply nested properties",
            input: mockUser,
            omit: ["username", "phones", "address.coordinates.lat"],
            expected: {
                address: {
                    city: "New York",
                    zip: "10001",
                    coordinates: {
                        long: -74.006,
                    },
                },
                tokens: [1, 2, 3, 4],
                active: true,
                meta: null as null | { created: string },
            },
        },
        {
            description: "should omit multiple deeply nested properties",
            input: mockUser,
            omit: ["username", "phones", "address.zip", "address.coordinates.long"],
            expected: {
                address: {
                    city: "New York",
                    coordinates: {
                        lat: 40.7128,
                    },
                },
                tokens: [1, 2, 3, 4],
                active: true,
                meta: null as null | { created: string },
            },
        },
    ]

    testCases.forEach(({ description, input, omit, expected }) => {
        test.concurrent(description, ({ expect }) => {
            const actual = deepOmit(input, omit)
            expect(actual).toEqual(expected)
        })
    })

    test("Checks return types of deepOmit", () => {
        expectTypeOf(deepOmit(mockUser, ["username", "phones.work"])).toEqualTypeOf<
            DeepOmit<typeof mockUser, "username" | "phones.work">
        >()
        expectTypeOf(deepOmit(mockUser, ["username", "phones.work", "address.coordinates.long"])).toEqualTypeOf<
            DeepOmit<typeof mockUser, "username" | "phones.work" | "address.coordinates.long">
        >()
        expectTypeOf(
            deepOmit(mockUser, ["username", "phones.work", "address.coordinates.lat", "address.coordinates.long"])
        ).toEqualTypeOf<
            DeepOmit<typeof mockUser, "username" | "phones.work" | "address.coordinates.lat" | "address.coordinates.long">
        >()
        expectTypeOf(deepOmit(mockUser, ["address", "phones"])).toEqualTypeOf<DeepOmit<typeof mockUser, "address" | "phones">>()
    })
})
