import { describe, expect, expectTypeOf, test } from "vitest"
import { get } from "../src/get"

describe("get", () => {
    const testCasesWithoutDefault = [
        {
            description: "looking for a property that exists in the first level",
            input: {
                foo: "bar",
                baz: {
                    qux: "quux",
                },
            },
            key: "foo",
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
            key: "baz.qux",
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
            key: "foo.bar.baz.qux",
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
            key: "foo.bar.quux",
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
            key: "foo.baz",
            expected: undefined,
        },
    ]

    const testCasesWithDefault = [
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
            key: "foo.baz",
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
            key: "foo.bar.baz.qz",
            defaultValue: "default",
            expected: "default",
        },
    ]

    describe("get with string keys", () => {
        testCasesWithoutDefault.forEach(({ description, input, key, expected }) => {
            test(description, () => {
                expect(get(input, key as any)).toEqual(expected)
            })
        })
    })

    describe("get with string keys and default values", () => {
        testCasesWithDefault.forEach(({ description, input, key, defaultValue, expected }) => {
            test(description, () => {
                expect(get(input, key as any, defaultValue)).toEqual(expected)
            })
        })
    })

    describe("type checking", () => {
        const user = {
            name: "John",
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
        }

        test("should return the correct type for a valid path", () => {
            expectTypeOf(get(user, "name")).toEqualTypeOf<string>()
            expectTypeOf(get(user, "tokens")).toEqualTypeOf<number[]>()
            expectTypeOf(get(user, "address.zip")).toEqualTypeOf<string>()
            expectTypeOf(get(user, "address.coordinates.lat")).toEqualTypeOf<number>()
            expectTypeOf(get(user, "active")).toEqualTypeOf<boolean>()
            expectTypeOf(get(user, "meta")).toEqualTypeOf<null | { created: string }>()
            expectTypeOf(get(user, "address.coordinates")).toEqualTypeOf<{
                lat: number
                long: number
            }>()
            expectTypeOf(get(user, "address")).toEqualTypeOf<{
                city: string
                zip: string
                coordinates: {
                    lat: number
                    long: number
                }
            }>()
        })

        test("should handle null types", () => {
            expectTypeOf(get(user, "keyThatDoesNotExist" as any)).toEqualTypeOf<any>()
            expectTypeOf(get(user, "keyThatDoesNotExist" as any, 12)).toEqualTypeOf<any>()
        })
    })
})
