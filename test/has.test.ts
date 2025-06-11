import { describe, expect, expectTypeOf, test } from "vitest"
import { has } from "@/has.js"

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
            key: "foo",
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
            key: "baz.qux",
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
            key: "foo.bar.baz.qux",
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
            key: "foo.bar.quux",
            expected: true,
        },
        {
            description: "looking for a property that does not exist in the first level",
            input: {
                foo: "bar",
                baz: {
                    qux: "quux",
                },
            },
            key: "notHere",
            expected: false,
        },
        {
            description: "looking for a property that does not exist in the second level",
            input: {
                foo: "bar",
                baz: {
                    qux: "quux",
                },
            },
            key: "baz.notHere",
            expected: false,
        },
        {
            description: "looking for a deeply nested property that does not exist",
            input: {
                foo: {
                    bar: {
                        baz: {
                            qux: "quux",
                        },
                    },
                },
            },
            key: "foo.bar.baz.notHere",
            expected: false,
        },
        {
            description: "looking for a property in a non-existent nested object",
            input: {
                foo: {
                    bar: {
                        baz: {
                            qux: "quux",
                        },
                    },
                },
            },
            key: "foo.baz.qux",
            expected: false,
        },
    ]

    testCases.forEach(({ description, input, key, expected }) => {
        test(description, () => {
            expect(has(input, key)).toBe(expected)
            expectTypeOf(has(input, key)).toEqualTypeOf<boolean>()
        })
    })
})
