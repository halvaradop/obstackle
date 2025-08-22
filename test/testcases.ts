export const mockUser = {
    username: "john_doe",
    address: {
        city: "New York",
        zip: "10001",
        coordinates: {
            lat: 40.7128,
            long: -74.006,
        },
    },
    phones: {
        home: "1234567890",
        work: "0987654321",
    },
    tokens: [1, 2, 3, 4],
    active: true,
    meta: null as null | { created: string },
}
export const mockStore = {
    address: {
        city: "New York City",
        state: "NY",
        number: 12,
        timezone: null,
        coordinates: {
            lat: null,
            long: undefined,
        },
    },
    phones: {
        main: "1234567890",
    },
    active: true,
    meta: {
        createdAt: "2023-10-01",
        updatedAt: "2023-10-02",
    },
    isOpen: null,
    isClosed: undefined,
}
