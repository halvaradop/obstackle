import { describe, test } from "vitest"
import { omit, deepOmit } from "../src/omit"

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
            deep: true,
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
})
