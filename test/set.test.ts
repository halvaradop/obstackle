import { describe, expect, test } from "vitest"
import { set } from "../src/set"

describe("set", () => {
    const testCases = [
        {
            input: {
                foo: "bar",
                bar: {
                    foofoo: "barfoo",
                },
                fizz: {
                    buzz: "foobar",
                },
            },
            key: "foo",
            value: "newBar",
            expected: {
                foo: "newBar",
                bar: {
                    foofoo: "barfoo",
                },
                fizz: {
                    buzz: "foobar",
                },
            },
        },
        {
            input: {
                foo: "bar",
                bar: {
                    foofoo: "barfoo",
                    barbar: {
                        bar: "barbar",
                        foo: "bazbar",
                        fizz: {
                            buzz: "foobar",
                        },
                    },
                },
                fizz: {
                    buzz: "foobar",
                },
            },
            key: "fizz.buzz",
            value: "newBar",
            expected: {
                foo: "bar",
                bar: {
                    foofoo: "barfoo",
                    barbar: {
                        bar: "barbar",
                        foo: "bazbar",
                        fizz: {
                            buzz: "foobar",
                        },
                    },
                },
                fizz: {
                    buzz: "newBar",
                },
            },
        },
        {
            input: {
                foo: "bar",
                bar: {
                    foofoo: "barfoo",
                    barbar: {
                        bar: "barbar",
                        foo: "bazbar",
                        fizz: {
                            buzz: "foobar",
                        },
                    },
                },
                fizz: {
                    buzz: "foobar",
                },
            },
            key: "bar.barbar.bar",
            value: "newBar",
            expected: {
                foo: "bar",
                bar: {
                    foofoo: "barfoo",
                    barbar: {
                        bar: "newBar",
                        foo: "bazbar",
                        fizz: {
                            buzz: "foobar",
                        },
                    },
                },
                fizz: {
                    buzz: "foobar",
                },
            },
        },

        {
            input: {
                foo: "bar",
                bar: {
                    foofoo: "barfoo",
                    barbar: {
                        bar: "barbar",
                        foo: "bazbar",
                        fizz: {
                            buzz: "foobar",
                        },
                    },
                },
                fizz: {
                    buzz: "foobar",
                },
            },
            key: "bar.barbar.fizz.buzz",
            value: "newBuzz",
            expected: {
                foo: "bar",
                bar: {
                    foofoo: "barfoo",
                    barbar: {
                        bar: "barbar",
                        foo: "bazbar",
                        fizz: {
                            buzz: "newBuzz",
                        },
                    },
                },
                fizz: {
                    buzz: "foobar",
                },
            },
        },
    ]

    testCases.forEach(({ input, key, value, expected }) => {
        test(`set ${key} to ${value}`, () => {
            const result = set(input, key as any, value)
            expect(result).toEqual(expected)
        })
    })
})
