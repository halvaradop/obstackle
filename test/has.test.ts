import { describe, expect, test } from "vitest"
import { has } from "../src/has"

describe("has", () => {
    const testCases = [
        {
            description: "looking for a property that exists in the first level",
            input: {
                foo: "bar",
                baz: {
                    qux: "quux",
                },
            },
            search: "foo",
            expected: true,
        },
        {
            description: "looking for a property that exists in the second level",
            input: {
                foo: "bar",
                baz: {
                    qux: "quux",
                },
            },
            search: "baz.qux",
            expected: true,
        },
        {
            description: "looking for a deeply nested property that exists",
            input: {
                foo: {
                    bar: {
                        baz: {
                            qux: "quux",
                        },
                    },
                },
            },
            search: "foo.bar.baz.qux",
            expected: true,
        },
        {
            description: "looking for a sibling property in a nested object",
            input: {
                foo: {
                    bar: {
                        baz: {
                            qux: "quux",
                        },
                        quux: "corge",
                    },
                },
            },
            search: "foo.bar.quux",
            expected: true,
        },
    ]

    testCases.forEach(({ description, input, search, expected }) => {
        test(description, () => {
            expect(has(input, search)).toBe(expected)
        })
    })
})
