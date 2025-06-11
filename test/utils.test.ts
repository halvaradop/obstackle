import { describe, expect, test } from "vitest"
import { isPrimitiveOrFunction } from "../src/utils"

describe("isPrimitiveOrFunction", () => {
    const testCases = [
        {
            description: "should return true for a string",
            input: "string",
            expected: true,
            withNullish: false,
        },
        {
            description: "should return true for a number",
            input: 42,
            expected: true,
            withNullish: false,
        },
        {
            description: "should return false for an array",
            input: [1, 2, 3, 4],
            expected: false,
            withNullish: false,
        },
        {
            description: "should return true for a function",
            input: () => {},
            expected: true,
            withNullish: false,
        },
        {
            description: "should return false for null when withNullish is false",
            input: null,
            expected: false,
            withNullish: false,
        },
        {
            description: "should return false for undefined when withNullish is false",
            input: undefined,
            expected: false,
            withNullish: false,
        },
        {
            description: "should return true for null when withNullish is true",
            input: null,
            expected: true,
            withNullish: true,
        },
        {
            description: "should return true for undefined when withNullish is true",
            input: undefined,
            expected: true,
            withNullish: true,
        },
    ]

    testCases.forEach(({ description, input, expected, withNullish }) => {
        test(description, () => {
            expect(isPrimitiveOrFunction(input, withNullish)).toBe(expected)
        })
    })
})
