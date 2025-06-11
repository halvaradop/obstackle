import { describe, expect, expectTypeOf, test } from "vitest"
import { set } from "@/set.js"
import { mockUser } from "./testcases.js"
import { deepClone } from "@/clone.js"

describe("set", () => {
    const testCases = [
        {
            input: deepClone(mockUser),
            key: "username",
            value: "john_doe_updated",
            expected: {
                username: "john_doe_updated",
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
            input: deepClone(mockUser),
            key: "address.city",
            value: "New York City",
            expected: {
                username: "john_doe",
                address: {
                    city: "New York City",
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
            input: deepClone(mockUser),
            key: "address.coordinates.lat",
            value: 49.2827,
            expected: {
                username: "john_doe",
                address: {
                    city: "New York",
                    zip: "10001",
                    coordinates: {
                        lat: 49.2827,
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
            input: deepClone(mockUser),
            key: "phones",
            value: "1234567890",
            expected: {
                username: "john_doe",
                address: {
                    city: "New York",
                    zip: "10001",
                    coordinates: {
                        lat: 40.7128,
                        long: -74.006,
                    },
                },
                phones: "1234567890",
                tokens: [1, 2, 3, 4],
                active: true,
                meta: null as null | { created: string },
            },
        },
        {
            input: deepClone(mockUser),
            key: "address",
            value: "New York",
            expected: {
                username: "john_doe",
                address: "New York",
                phones: {
                    home: "1234567890",
                    work: "0987654321",
                },
                tokens: [1, 2, 3, 4],
                active: true,
                meta: null as null | { created: string },
            },
        },
    ]

    testCases.forEach(({ input, key, value, expected }) => {
        test(`set ${key} to ${value}`, () => {
            const updated = set(input, key as keyof typeof input, value)
            expect(updated).toEqual(expected)
        })
    })

    describe("type checking", () => {
        test("should return the correct type when setting a value", () => {
            expectTypeOf(set(mockUser, "username", "new_username", true)).toEqualTypeOf<{
                username: string
                address: {
                    city: string
                    zip: string
                    coordinates: {
                        lat: number
                        long: number
                    }
                }
                phones: {
                    home: string
                    work: string
                }
                tokens: number[]
                active: boolean
                meta: null | { created: string }
            }>()
            expectTypeOf(set(mockUser, "address", 1234, true)).toEqualTypeOf<{
                username: string
                address: number
                phones: {
                    home: string
                    work: string
                }
                tokens: number[]
                active: boolean
                meta: null | { created: string }
            }>()
            expectTypeOf(set(mockUser, "phones", "+12345", true)).toEqualTypeOf<{
                username: string
                address: {
                    city: string
                    zip: string
                    coordinates: {
                        lat: number
                        long: number
                    }
                }
                phones: string
                tokens: number[]
                active: boolean
                meta: null | { created: string }
            }>()
            expectTypeOf(set(mockUser, "meta", false, true)).toEqualTypeOf<{
                username: string
                address: {
                    city: string
                    zip: string
                    coordinates: {
                        lat: number
                        long: number
                    }
                }
                phones: {
                    home: string
                    work: string
                }
                tokens: number[]
                active: boolean
                meta: boolean
            }>()
        })
    })
})
