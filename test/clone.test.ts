import { describe, expect, expectTypeOf, test } from "vitest"
import { deepClone, deepCloneArray, deepCloneObject } from "../src/clone"

describe("deepCloneObject", () => {
    const testCasesWithoutNullish = [
        {
            description: "Simple object with string and number properties",
            input: {
                foo: "bar",
                bar: 42,
            },
            expected: {
                foo: "bar",
                bar: 42,
            },
            skip: false,
        },
        {
            description: "Nested object with string and number properties",
            input: {
                foo: "bar",
                bar: {
                    baz: 42,
                },
            },
            expected: {
                foo: "bar",
                bar: {
                    baz: 42,
                },
            },
            skip: false,
        },
        {
            description: "Deeply nested object",
            input: {
                foo: "bar",
                bar: {
                    foobar: {
                        foofoo: {
                            barbar: {
                                baz: 42,
                            },
                        },
                    },
                },
            },
            expected: {
                foo: "bar",
                bar: {
                    foobar: {
                        foofoo: {
                            barbar: {
                                baz: 42,
                            },
                        },
                    },
                },
            },
            skip: false,
        },
        {
            description: "Object with array and nested object",
            input: {
                foo: ["bar", "baz"],
                bar: {
                    baz: 42,
                },
            },
            expected: {
                foo: ["bar", "baz"],
                bar: {
                    baz: 42,
                },
            },
            skip: false,
        },
        {
            description: "Object with nested arrays and objects",
            input: {
                foo: ["bar", "baz"],
                bar: {
                    foobar: [{ foo: [{ bar: { foobar: ["baz"] } }] }, { bar: { barbar: [{ bar: 12 }] } }],
                },
            },
            expected: {
                foo: ["bar", "baz"],
                bar: {
                    foobar: [{ foo: [{ bar: { foobar: ["baz"] } }] }, { bar: { barbar: [{ bar: 12 }] } }],
                },
            },
            skip: false,
        },
        {
            description: "Object with null and undefined properties",
            input: {
                foo: null,
                bar: undefined,
                baz: 123,
            },
            expected: {
                foo: null,
                bar: undefined,
                baz: 123,
            },
            skip: false,
        },
        {
            description: "Nested object with null and undefined",
            input: {
                foo: {
                    bar: null,
                    baz: undefined,
                },
                qux: "value",
            },
            expected: {
                foo: {
                    bar: null,
                    baz: undefined,
                },
                qux: "value",
            },
            skip: false,
        },
        {
            description: "Array with null and undefined values",
            input: [1, null, 2, undefined, 3],
            expected: [1, null, 2, undefined, 3],
            skip: false,
        },
        {
            description: "Deeply nested nullish values",
            input: {
                foo: [{ bar: null }, { baz: [undefined, 42] }],
            },
            expected: {
                foo: [{ bar: null }, { baz: [undefined, 42] }],
            },
            skip: false,
        },
        {
            description: "Object with only null and undefined",
            input: {
                foo: null,
                bar: undefined,
            },
            expected: {
                foo: null,
                bar: undefined,
            },
            skip: false,
        },
    ]

    const testCasesWithNullish = [
        {
            description: "Object with null and undefined properties, remove nullish",
            input: {
                foo: null,
                bar: undefined,
                baz: {
                    fiz: null,
                    buz: undefined,
                },
            },
            expected: {
                baz: {},
            },
            skip: true,
        },
        {
            description: "Object with arrays and nested null/undefined, remove nullish",
            input: {
                foo: [null, undefined, "bar"],
                bar: {
                    fiz: null,
                    buz: undefined,
                },
            },
            expected: {
                foo: ["bar"],
                bar: {},
            },
            skip: true,
        },
        {
            description: "Deeply nested object with null and undefined, remove nullish",
            input: {
                foo: {
                    bar: {
                        fiz: null,
                        buz: [undefined, null],
                    },
                },
            },
            expected: {
                foo: {
                    bar: {
                        buz: [],
                    },
                },
            },
            skip: true,
        },
        {
            description: "Array of objects with nullish values, remove nullish",
            input: [
                { foo: null, bar: 1 },
                { foo: undefined, bar: 2 },
                { foo: 3, bar: null },
            ],
            expected: [{ bar: 1 }, { bar: 2 }, { foo: 3 }],
            skip: true,
        },
        {
            description: "Object with mixed types and nullish values, remove nullish",
            input: {
                foo: "bar",
                bar: null,
                arr: [1, null, 2, undefined, 3],
                nested: {
                    fiz: undefined,
                    buz: "baz",
                },
            },
            expected: {
                foo: "bar",
                arr: [1, 2, 3],
                nested: {
                    buz: "baz",
                },
            },
            skip: true,
        },
        {
            description: "Empty object and array with nullish values, remove nullish",
            input: {
                emptyObj: {},
                emptyArr: [],
                nullVal: null,
                undefVal: undefined,
            },
            expected: {
                emptyObj: {},
                emptyArr: [],
            },
            skip: true,
        },
        {
            description: "Object with boolean, number, string and nullish values, remove nullish",
            input: {
                bool: false,
                num: 0,
                str: "",
                foo: null,
                bar: undefined,
            },
            expected: {
                bool: false,
                num: 0,
                str: "",
            },
            skip: true,
        },
        {
            description: "Nested arrays with nullish values, remove nullish",
            input: {
                arr: [[null, 1, undefined], [2, null, 3], [], [undefined]],
            },
            expected: {
                arr: [[1], [2, 3], [], []],
            },
            skip: true,
        },
    ]

    describe("deep clone with nullish values", () => {
        testCasesWithoutNullish.forEach(({ description, input, expected, skip }) => {
            test(description, () => {
                const clone = deepClone(input, skip)
                expect(clone).toEqual(expected)
            })
        })
    })

    describe("deep clone without nullish values", () => {
        testCasesWithNullish.forEach(({ description, input, expected, skip }) => {
            test(description, () => {
                const clone = deepClone(input, skip)
                expect(clone).toEqual(expected)
            })
        })
    })

    describe("type checking", () => {
        test("should return the same type as input when skip is false", () => {
            const object = { foo: "bar", bar: 42 }
            const clone = deepCloneObject(object, false)
            expectTypeOf(clone).toEqualTypeOf<typeof object>()
        })

        test("should return a filtered type when skip is true", () => {
            const object = { foo: null, bar: undefined, baz: 123 }
            const clone = deepCloneObject(object, true)
            expectTypeOf(clone).toEqualTypeOf<{ baz: number }>()
        })

        test("should handle arrays with nullish values", () => {
            const object = { nums: [1, null, 2, undefined, 3] }
            const clone = deepCloneObject(object, true)
            expectTypeOf(clone).toEqualTypeOf<{ nums: (number | null | undefined)[] }>()
        })

        test("should handle nested objects with nullish values", () => {
            const object = {
                bar: {
                    foobar: {
                        foofoo: {
                            barbar: {
                                baz: 42,
                            },
                        },
                    },
                },
            }
            const clone = deepCloneObject(object, true)
            expectTypeOf(clone).toEqualTypeOf<typeof object>()
        })

        test("Represents a sample object with nested properties.", () => {
            const object = {
                foo: ["bar", "baz"],
                bar: {
                    baz: 42,
                },
            }
            const clone = deepCloneObject(object, false)
            expectTypeOf(clone).toEqualTypeOf<typeof object>()
        })

        test("should handle nested objects with nullish values", () => {
            const object = {
                bar: {
                    foobar: {
                        foofoo: {
                            barbar: {
                                baz: 42,
                            },
                            foobar: undefined,
                        },
                        barbar: null,
                    },
                },
            }
            const clone = deepCloneObject(object, true)
            expectTypeOf(clone).toEqualTypeOf<{
                bar: {
                    foobar: {
                        foofoo: {
                            barbar: {
                                baz: number
                            }
                        }
                    }
                }
            }>()
        })
    })
})

describe("deepCloneArray", () => {
    const testCases = [
        {
            description: "should clone an array of primitives",
            input: [1, 2, 3, null, undefined],
            expected: [1, 2, 3, null, undefined],
            skip: false,
        },
        {
            description: "should clone an array with nested objects",
            input: [{ a: 1 }, { b: 2 }],
            expected: [{ a: 1 }, { b: 2 }],
            skip: false,
        },
        {
            description: "should clone an array with mixed types",
            input: [1, "string", { a: 1 }],
            expected: [1, "string", { a: 1 }],
            skip: false,
        },
        {
            description: "should clone an empty array",
            input: [],
            expected: [],
            skip: false,
        },
        {
            description: "should clone an array with nullish values when skip is true",
            input: [null, undefined, 1],
            expected: [1],
            skip: true,
        },
    ]

    testCases.forEach(({ description, input, expected, skip }) => {
        test(description, () => {
            const result = deepCloneArray(input, skip)
            expect(result).toEqual(expected)
        })
    })

    describe("type checking", () => {
        test("should return the same type as input when skip is false", () => {
            const array = [1, 2, 3]
            const clone = deepCloneArray(array, false)
            expectTypeOf(clone).toEqualTypeOf<typeof array>()
        })

        test("should return a filtered type when skip is true", () => {
            const array = [1, null, 2, undefined, 3]
            const clone = deepCloneArray(array, true)
            expectTypeOf(clone).toEqualTypeOf<(number | null | undefined)[]>()
        })
    })
})

/**
 * Tests the type checking of the `deepClone` function. These tests are the same
 * that are used in the `deepCloneObject` and `deepCloneArray` tests just to ensure
 * that the type checking works correctly for the `deepClone` function as well.
 */
describe("deepClone type checking", () => {
    test("should return the same type as input when skip is false", () => {
        const object = { foo: "bar", bar: 42 }
        const clone = deepClone(object, false)
        expectTypeOf(clone).toEqualTypeOf<typeof object>()
    })

    test("should return a filtered type when skip is true", () => {
        const object = { foo: null, bar: undefined, baz: 123 }
        const clone = deepClone(object, true)
        expectTypeOf(clone).toEqualTypeOf<{ baz: number }>()
    })

    test("should handle arrays with nullish values", () => {
        const object = { nums: [1, null, 2, undefined, 3] }
        const clone = deepClone(object, true)
        expectTypeOf(clone).toEqualTypeOf<{ nums: (number | null | undefined)[] }>()
    })

    test("should handle nested objects with nullish values", () => {
        const object = {
            bar: {
                foobar: {
                    foofoo: {
                        barbar: {
                            baz: 42,
                        },
                    },
                },
            },
        }
        const clone = deepClone(object, true)
        expectTypeOf(clone).toEqualTypeOf<typeof object>()
    })

    test("Represents a sample object with nested properties.", () => {
        const object = {
            foo: ["bar", "baz"],
            bar: {
                baz: 42,
            },
        }
        const clone = deepClone(object, false)
        expectTypeOf(clone).toEqualTypeOf<typeof object>()
    })

    test("should handle nested objects with nullish values", () => {
        const object = {
            bar: {
                foobar: {
                    foofoo: {
                        barbar: {
                            baz: 42,
                        },
                        foobar: undefined,
                    },
                    barbar: null,
                },
            },
        }
        const clone = deepClone(object, true)
        expectTypeOf(clone).toEqualTypeOf<{
            bar: {
                foobar: {
                    foofoo: {
                        barbar: {
                            baz: number
                        }
                    }
                }
            }
        }>()
    })

    test("should return the same type as input when skip is false", () => {
        const array = [1, 2, 3]
        const clone = deepClone(array, false)
        expectTypeOf(clone).toEqualTypeOf<typeof array>()
    })

    test("should return a filtered type when skip is true", () => {
        const array = [1, null, 2, undefined, 3]
        const clone = deepClone(array, true)
        expectTypeOf(clone).toEqualTypeOf<(number | null | undefined)[]>()
    })
})
