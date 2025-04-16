import { describe, expect, test } from "vitest"
import { deepClone } from "../src/clone"

describe("deepClone", () => {
    const testCases = [
        {
            foo: "bar",
            bar: 42,
        },
        {
            foo: "bar",
            bar: {
                baz: 42,
            },
        },
        {
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
        {
            foo: "bar",
            bar: {
                foobar: {
                    foofoo: {
                        barbar: {
                            baz: 42,
                            bar: undefined,
                        },
                        barfoo: null,
                    },
                    foobar: undefined,
                },
                barbar: null,
            },
        },
        {
            foo: ["bar", "baz"],
            bar: {
                baz: 42,
            },
        },
        {
            foo: ["bar", "baz"],
            bar: {
                foobar: [{ foo: [{ bar: { foobar: ["baz"] } }] }, { bar: { barbar: [{ bar: 12 }] } }],
            },
        },
    ]

    testCases.forEach((testCase) => {
        test(`deepClone(${JSON.stringify(testCase)})`, () => {
            const clone = deepClone(testCase)
            expect(clone).toEqual(testCase)
        })
    })
})
