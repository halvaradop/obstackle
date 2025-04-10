import { describe, expect, test } from "vitest"
import { get } from "../src/get"

describe("get", () => {
    const testCases = [
        {
            description: "looking for a property that exists in the first level",
            input: {
                foo: "bar",
                baz: {
                    qux: "quux",
                },
            },
            get: "foo",
            expected: "bar",
        },
        {
            description: "looking for a property that exists in the second level",
            input: {
                foo: "bar",
                baz: {
                    qux: "quux",
                },
            },
            get: "baz.qux",
            expected: "quux",
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
            get: "foo.bar.baz.qux",
            expected: "quux",
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
            get: "foo.bar.quux",
            expected: "corge",
        },
        {
            description: "looking for a property that does not exist in the first level",
            input: {
                foo: {
                    bar: {
                        baz: {
                            qux: "quux",
                        },
                    },
                },
            },
            get: "foo.baz",
            expected: undefined,
        },
        {
            description: "looking for a property that does not exist and returning a default value",
            input: {
                foo: {
                    bar: {
                        baz: {
                            qux: "quux",
                        },
                    },
                },
            },
            get: "foo.baz",
            defaultValue: -1,
            expected: -1,
        },
        {
            description: "looking for a deeply nested property that does not exist and returning a default value",
            input: {
                foo: {
                    bar: {
                        baz: {
                            qux: "quux",
                        },
                    },
                },
            },
            get: "foo.bar.baz.qz",
            defaultValue: "default",
            expected: "default",
        },
    ]

    testCases.forEach(({ description, input, get: getKey, expected, defaultValue }) => {
        test(description, () => {
            expect(get(input, getKey as any, defaultValue)).toEqual(expected)
        })
    })
})
