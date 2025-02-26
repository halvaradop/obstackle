import { describe, test } from "vitest"
import { omit } from "../src/omit"

describe("omit", () => {
    const testCases = [
        {
            description: "should omit a single top-level property",
            input: {
                username: "john_doe",
                password: "john123",
            },
            exclude: "password",
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
            exclude: "phone",
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
            exclude: "phone",
            deep: true,
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
            exclude: ["phone", "address"],
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
            exclude: ["phone", "address"],
            deep: true,
            expected: {
                firstname: "john",
                lastname: "doe",
                username: "john_doe",
            },
        },
    ]

    testCases.forEach(({ description, input, exclude, deep, expected }) => {
        test.concurrent(description, ({ expect }) => {
            const actual = omit(input, exclude as keyof typeof input, deep)
            expect(actual).toEqual(expected)
        })
    })
})
