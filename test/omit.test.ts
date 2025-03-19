import { describe, expectTypeOf, test } from "vitest"
import { omit, deepOmit } from "../src/omit"
import type { DeepOmit } from "@halvaradop/ts-utility-types/objects"

interface TestCase {
    description: string
    input: Record<string, unknown>
    omit: string | string[]
    expected: Record<string, unknown>
}

describe("omit", () => {
    const testCases = [
        {
            description: "should omit a single top-level property",
            input: {
                username: "john_doe",
                password: "john123",
            },
            omit: "password",
            deep: false,
            expected: {
                username: "john_doe",
            },
        },
        {
            description: "should omit a single nested property without deep omit",
            input: {
                username: "john_doe",
                address: {
                    city: "New York",
                    country: "USA",
                },
                phone: {
                    home: "1234567890",
                    work: "0987654321",
                },
            },
            omit: "phone",
            deep: false,
            expected: {
                username: "john_doe",
                address: {
                    city: "New York",
                    country: "USA",
                },
            },
        },
        {
            description: "should omit a single nested property with deep omit",
            input: {
                username: "john_doe",
                address: {
                    city: "New York",
                    country: "USA",
                },
                phone: {
                    home: "1234567890",
                    work: "0987654321",
                },
            },
            omit: "phone",
            deep: false,
            expected: {
                username: "john_doe",
                address: {
                    city: "New York",
                    country: "USA",
                },
            },
        },
        {
            description: "should omit multiple top-level properties without deep omit",
            input: {
                firstname: "john",
                lastname: "doe",
                username: "john_doe",
                address: {
                    city: "New York",
                    country: "USA",
                },
                phone: {
                    home: "1234567890",
                    work: "0987654321",
                },
            },
            omit: ["phone", "address"],
            deep: false,
            expected: {
                firstname: "john",
                lastname: "doe",
                username: "john_doe",
            },
        },
        {
            description: "should omit multiple nested properties with deep omit",
            input: {
                firstname: "john",
                lastname: "doe",
                username: "john_doe",
                address: {
                    city: "New York",
                    country: "USA",
                },
                phone: {
                    home: "1234567890",
                    work: "0987654321",
                },
            },
            omit: ["phone", "address"],
            deep: true,
            expected: {
                firstname: "john",
                lastname: "doe",
                username: "john_doe",
            },
        },
    ]

    testCases.forEach(({ description, input, omit: omitKeys, deep, expected }) => {
        test.concurrent(description, ({ expect }) => {
            const actual = omit(input, omitKeys as keyof typeof input, deep)
            expect(actual).toEqual(expected)
        })
    })

    test("Checks return types of omit", () => {
        const user = {
            firstname: "john",
            lastname: "doe",
            username: "john_doe",
            address: {
                city: "New York",
                country: "USA",
            },
            phone: {
                home: "1234567890",
                work: "0987654321",
            },
        }
        expectTypeOf(omit(user, ["address", "phone"])).toEqualTypeOf<Omit<typeof user, "address" | "phone">>()
        expectTypeOf(omit(user, ["address", "phone", "firstname", "username"])).toEqualTypeOf<
            Omit<typeof user, "address" | "phone" | "firstname" | "username">
        >()
    })
})

describe("deepOmit", () => {
    const testCases: TestCase[] = [
        {
            description: "should omit a single top-level property",
            input: {
                username: "john_doe",
                address: {
                    country: {
                        name: "USA",
                        code: "US",
                        city: {
                            name: "New York",
                            code: "NY",
                        },
                    },
                },
                phone: {
                    home: "1234567890",
                    work: "0987654321",
                },
            },
            omit: "username",
            expected: {
                address: {
                    country: {
                        name: "USA",
                        code: "US",
                        city: {
                            name: "New York",
                            code: "NY",
                        },
                    },
                },
                phone: {
                    home: "1234567890",
                    work: "0987654321",
                },
            },
        },
        {
            description: "should omit multiple nested properties",
            input: {
                username: "john_doe",
                address: {
                    country: {
                        name: "USA",
                        code: "US",
                        city: {
                            name: "New York",
                            code: "NY",
                        },
                    },
                },
                phone: {
                    home: "1234567890",
                    work: "0987654321",
                },
            },
            omit: ["username", "phone.work"],
            expected: {
                address: {
                    country: {
                        name: "USA",
                        code: "US",
                        city: {
                            name: "New York",
                            code: "NY",
                        },
                    },
                },
                phone: {
                    home: "1234567890",
                },
            },
        },
        {
            description: "should omit multiple top-level and nested properties",
            input: {
                username: "john_doe",
                address: {
                    country: {
                        name: "USA",
                        code: "US",
                        city: {
                            name: "New York",
                            code: "NY",
                        },
                    },
                },
                phone: {
                    home: "1234567890",
                    work: "0987654321",
                },
            },
            omit: ["username", "phone"],
            expected: {
                address: {
                    country: {
                        name: "USA",
                        code: "US",
                        city: {
                            name: "New York",
                            code: "NY",
                        },
                    },
                },
            },
        },
        {
            description: "should omit deeply nested properties",
            input: {
                username: "john_doe",
                address: {
                    country: {
                        name: "USA",
                        code: "US",
                        city: {
                            name: "New York",
                            code: "NY",
                        },
                    },
                },
                phone: {
                    home: "1234567890",
                    work: "0987654321",
                },
            },
            omit: ["username", "phone", "address.country.code"],
            expected: {
                address: {
                    country: {
                        name: "USA",
                        city: {
                            name: "New York",
                            code: "NY",
                        },
                    },
                },
            },
        },
        {
            description: "should omit multiple deeply nested properties",
            input: {
                username: "john_doe",
                address: {
                    country: {
                        name: "USA",
                        code: "US",
                        city: {
                            name: "New York",
                            code: "NY",
                        },
                    },
                },
                phone: {
                    home: "1234567890",
                    work: "0987654321",
                },
            },
            omit: ["username", "phone", "address.country.code", "address.country.city.code"],
            expected: {
                address: {
                    country: {
                        name: "USA",
                        city: {
                            name: "New York",
                        },
                    },
                },
            },
        },
    ]

    testCases.forEach(({ description, input, omit, expected }) => {
        test.concurrent(description, ({ expect }) => {
            const actual = deepOmit(input, omit)
            expect(actual).toEqual(expected)
        })
    })

    test("Checks return types of deepOmit", () => {
        const user = {
            username: "john_doe",
            address: {
                country: {
                    name: "USA",
                    code: "US",
                    city: {
                        name: "New York",
                        code: "NY",
                    },
                },
            },
            phone: {
                home: "1234567890",
                work: "0987654321",
            },
        }
        expectTypeOf(deepOmit(user, ["username", "phone.work"])).toEqualTypeOf<DeepOmit<typeof user, "username" | "phone.work">>()
        expectTypeOf(deepOmit(user, ["username", "phone.work", "address.country.code"])).toEqualTypeOf<
            DeepOmit<typeof user, "username" | "phone.work" | "address.country.code">
        >()
        expectTypeOf(
            deepOmit(user, ["username", "phone.work", "address.country.code", "address.country.city.code"]),
        ).toEqualTypeOf<DeepOmit<typeof user, "username" | "phone.work" | "address.country.code" | "address.country.city.code">>()
    })
})
