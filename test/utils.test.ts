import { describe, expect, test } from "vitest"
import { getKeyFromPath, isPrimitiveOrFunction } from "@/utils.js"

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

describe("getKeyFromPath", () => {
    const testCases = [
        {
            description: "should return the key and the rest of the path",
            input: "foo.bar.baz",
            expected: ["foo", "bar.baz"],
        },
        {
            description: "should return the key and an empty string if no dot is present",
            input: "foo",
            expected: ["foo", ""],
        },
        {
            description: "should return the key and the rest of the path when there are multiple dots",
            input: "foo.bar.baz.qux",
            expected: ["foo", "bar.baz.qux"],
        },
        {
            description: "should return the key and the rest of the path when the first part is empty",
            input: ".bar.baz",
            expected: ["", "bar.baz"],
        },
        {
            description: "should return the key and the rest of the path when the last part is empty",
            input: "foo.bar.",
            expected: ["foo", "bar."],
        },
        {
            description: "should return [false, ''] for an empty string input",
            input: "",
            expected: ["", ""],
        },
        {
            description: "should return the key and the rest of the path for a single dot",
            input: "foo.bar",
            expected: ["foo", "bar"],
        },
    ]
    testCases.forEach(({ description, input, expected }) => {
        test(description, () => {
            expect(getKeyFromPath(input)).toEqual(expected)
        })
    })
})
