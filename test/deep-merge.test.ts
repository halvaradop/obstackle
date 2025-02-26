import { describe, test } from "vitest"
import { deepMerge } from "../src/deep"

interface TestCase {
    description: string
    source: Record<string, unknown>
    target: Record<string, unknown>
    expected: Record<string, unknown>
    priority: "source" | "target" | "object"
}

describe("deepMerge", () => {
    const testCases: TestCase[] = [
        {
            description: "Source object has priority over target object",
            source: {
                foo: "bar",
                bar: 999,
                foobar: true,
            },
            target: {
                foo: "barbar",
            },
            expected: {
                foo: "bar",
                bar: 999,
                foobar: true,
            },
            priority: "source",
        },
        {
            description: "Target object has priority over source object",
            source: {
                foo: "bar",
                bar: 999,
                foobar: true,
            },
            target: {
                foo: "barbar",
                foobar: "foobar",
            },
            expected: {
                foo: "barbar",
                bar: 999,
                foobar: "foobar",
            },
            priority: "target",
        },
        {
            description: "Source object with nested properties merged with target object",
            source: {
                foo: {
                    bar: {
                        foobar: "foobar",
                    },
                },
            },
            target: {
                barfoo: "barfoo",
            },
            expected: {
                foo: {
                    bar: {
                        foobar: "foobar",
                    },
                },
                barfoo: "barfoo",
            },
            priority: "source",
        },
        {
            description: "Target object with nested properties merged with source object",
            source: {
                barfoo: "barfoo",
            },
            target: {
                foo: {
                    bar: {
                        foobar: "foobar",
                    },
                },
            },
            expected: {
                foo: {
                    bar: {
                        foobar: "foobar",
                    },
                },
                barfoo: "barfoo",
            },
            priority: "target",
        },
        {
            description: "Source object with deeply nested properties merged with target object",
            source: {
                foo: {
                    foofoo: {
                        barfoo: "barfoo",
                    },
                },
            },
            target: {
                foo: {
                    bar: {
                        foobar: "foobar",
                    },
                },
            },
            expected: {
                foo: {
                    bar: {
                        foobar: "foobar",
                    },
                    foofoo: {
                        barfoo: "barfoo",
                    },
                },
            },
            priority: "source",
        },
        {
            description: "Target object with deeply nested properties merged with source object",
            source: {
                foo: {
                    foofoo: {
                        barfoo: "barfoo",
                    },
                },
            },
            target: {
                foo: {
                    bar: {
                        foobar: "foobar",
                    },
                },
            },
            expected: {
                foo: {
                    bar: {
                        foobar: "foobar",
                    },
                    foofoo: {
                        barfoo: "barfoo",
                    },
                },
            },
            priority: "target",
        },
        {
            description: "Deeply nested source object with priority over target object",
            source: {
                foo: {
                    bar: {
                        baz: {
                            qux: "quux",
                        },
                    },
                },
            },
            target: {
                foo: {
                    bar: {
                        baz: {
                            qux: "corge",
                        },
                    },
                },
            },
            expected: {
                foo: {
                    bar: {
                        baz: {
                            qux: "quux",
                        },
                    },
                },
            },
            priority: "source",
        },
        {
            description: "Deeply nested target object with priority over source object",
            source: {
                foo: {
                    bar: {
                        baz: {
                            qux: "quux",
                        },
                    },
                },
            },
            target: {
                foo: {
                    bar: {
                        baz: {
                            qux: "corge",
                        },
                    },
                },
            },
            expected: {
                foo: {
                    bar: {
                        baz: {
                            qux: "corge",
                        },
                    },
                },
            },
            priority: "target",
        },
        {
            description: "Source object with multiple nested properties merged with target object",
            source: {
                foo: {
                    bar: {
                        baz: "baz",
                    },
                    qux: "quux",
                },
            },
            target: {
                foo: {
                    bar: {
                        corge: "grault",
                    },
                },
            },
            expected: {
                foo: {
                    bar: {
                        baz: "baz",
                        corge: "grault",
                    },
                    qux: "quux",
                },
            },
            priority: "source",
        },
        {
            description: "Target object with multiple nested properties merged with source object",
            source: {
                foo: {
                    bar: {
                        baz: "baz",
                    },
                    qux: "quux",
                },
            },
            target: {
                foo: {
                    bar: {
                        corge: "grault",
                    },
                },
            },
            expected: {
                foo: {
                    bar: {
                        baz: "baz",
                        corge: "grault",
                    },
                    qux: "quux",
                },
            },
            priority: "target",
        },
        {
            description: "Source object with deeply nested properties merged with target object",
            source: {
                foo: {
                    bar: {
                        baz: {
                            qux: {
                                quux: {
                                    corge: "grault",
                                },
                            },
                        },
                    },
                },
            },
            target: {
                foo: {
                    bar: {
                        baz: {
                            qux: {
                                quux: {
                                    garply: "waldo",
                                },
                            },
                        },
                    },
                },
            },
            expected: {
                foo: {
                    bar: {
                        baz: {
                            qux: {
                                quux: {
                                    corge: "grault",
                                    garply: "waldo",
                                },
                            },
                        },
                    },
                },
            },
            priority: "source",
        },
        {
            description: "Source object with multiple deeply nested properties merged with target object",
            source: {
                foo: {
                    bar: {
                        baz: {
                            qux: {
                                quux: "quuz",
                            },
                        },
                    },
                    corge: {
                        grault: {
                            garply: "waldo",
                        },
                    },
                },
            },
            target: {
                foo: {
                    bar: {
                        baz: {
                            qux: {
                                quux: "fred",
                            },
                        },
                    },
                    corge: {
                        grault: {
                            garply: "plugh",
                        },
                    },
                },
            },
            expected: {
                foo: {
                    bar: {
                        baz: {
                            qux: {
                                quux: "quuz",
                            },
                        },
                    },
                    corge: {
                        grault: {
                            garply: "waldo",
                        },
                    },
                },
            },
            priority: "source",
        },
        {
            description: "Target object with multiple deeply nested properties merged with source object",
            source: {
                foo: {
                    bar: {
                        baz: {
                            qux: {
                                quux: "quuz",
                            },
                        },
                    },
                    corge: {
                        grault: {
                            garply: "waldo",
                        },
                    },
                },
            },
            target: {
                foo: {
                    bar: {
                        baz: {
                            qux: {
                                quux: "fred",
                            },
                        },
                    },
                    corge: {
                        grault: {
                            garply: "plugh",
                        },
                    },
                },
            },
            expected: {
                foo: {
                    bar: {
                        baz: {
                            qux: {
                                quux: "fred",
                            },
                        },
                    },
                    corge: {
                        grault: {
                            garply: "plugh",
                        },
                    },
                },
            },
            priority: "target",
        },
        {
            description: "Merge arrays with source object having priority over target object",
            source: {
                foobar: [1, 2, 3, { foo: "bar" }],
            },
            target: {
                foobar: [4, 5, 6, { bar: "foo" }],
            },
            expected: {
                foobar: [1, 2, 3, { foo: "bar" }],
            },
            priority: "source",
        },
        {
            description: "Merge arrays with target object having priority over source object",
            source: {
                foobar: [1, 2, 3, { foo: "bar" }],
            },
            target: {
                foobar: [4, 5, 6, { bar: "foo" }],
            },
            expected: {
                foobar: [4, 5, 6, { bar: "foo" }],
            },
            priority: "target",
        },
        {
            description: "",
            source: {
                foo: {
                    foobar: {
                        foofoo: "barbar",
                        barbar: {
                            fiz: "buz",
                            buz: [{ foo: "bar", bar: [1, 2] }],
                        },
                    },
                    barfoo: {
                        foo: "bar",
                        bar: "foo",
                        foofoo: [1, 2, 3],
                    },
                    barbar: [{ foo: "bar", bar: "foo", foofoo: [1, 2, 3] }],
                },
            },
            target: {
                foo: {
                    foobar: {
                        barbar: {
                            buz: [{ fiz: "buz" }],
                        },
                    },
                },
                bar: {
                    foo: "bar",
                    bar: "foo",
                    foofoo: [1, 2, 3],
                },
            },
            expected: {
                foo: {
                    foobar: {
                        foofoo: "barbar",
                        barbar: {
                            fiz: "buz",
                            buz: [{ foo: "bar", bar: [1, 2] }],
                        },
                    },
                    barfoo: {
                        foo: "bar",
                        bar: "foo",
                        foofoo: [1, 2, 3],
                    },
                    barbar: [{ foo: "bar", bar: "foo", foofoo: [1, 2, 3] }],
                },
                bar: {
                    foo: "bar",
                    bar: "foo",
                    foofoo: [1, 2, 3],
                },
            },
            priority: "source",
        },
    ]

    testCases.forEach(({ description, source, target, priority, expected }) => {
        test.concurrent(description, ({ expect }) => {
            expect(deepMerge(source, target, priority)).toEqual(expected)
        })
    })
})
