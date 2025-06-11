import { describe, expect, expectTypeOf, test } from "vitest"
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

    describe("get with string keys", () => {
        testCases.forEach(({ description, input, get: getKey, expected, defaultValue }) => {
            test(description, () => {
                expect(get(input, getKey as any, defaultValue)).toEqual(expected)
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
