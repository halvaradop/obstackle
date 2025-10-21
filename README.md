# `@halvaradop/obstackle`

This library provides toolkits with utilities, functionalities, and methods for object manipulation. The code is written in `TypeScript`, offering autocomplete for the functionalities.

## Installation

Follow these steps to install the package in your project:

```sh
npm i @halvaradop/obstackle
# or
pnpm add @halvaradop/obstackle
```

## Table of Contents

- [deepClone](#deep-clone)
- [deepCloneArray](#deep-clone-array)
- [deepCloneObject](#deep-clone-object)
- [deepMerge](#deep-merge)
- [deepCopyArray](#deep-copy-array)
- [get](#get)
- [has](#has)
- [omit](#omit)
- [deepOmit](#deep-omit)
- [pick](#pick)
- [set](#set)

---

### deepClone

Deeply clone an object or array, recursively copying all nested values. Optionally omit nullish values.

```ts
import { deepClone } from "@halvaradop/obstackle/clone"

const obj = { a: 1, b: { c: 2 }, d: null }

// Expected: { a: 1, b: { c: 2 }, d: null }
const copy = deepClone(obj)

// Expected: { a: 1, b: { c: 2 } }
const copyNoNullish = deepClone(obj, true)
```

### deepCloneArray

Deeply clone an array, recursively copying all nested arrays/objects. Optionally omit nullish values.

```ts
import { deepCloneArray } from "@halvaradop/obstackle/clone"

const arr = [1, { a: 2 }, null]

// Expected: [1, { a: 2 }, null]
const copy = deepCloneArray(arr)

// Expected: [1, { a: 2 }]
const copyNoNullish = deepCloneArray(arr, true)
```

### deepCloneObject

Deeply clone an object, recursively copying all nested values. Optionally omit nullish values.

```ts
import { deepCloneObject } from "@halvaradop/obstackle/clone"

const obj = { a: 1, b: { c: 2 }, d: null }

// Expected: { a: 1, b: { c: 2 }, d: null }
const copy = deepCloneObject(obj)

// Expected: { a: 1, b: { c: 2 } }
const copyNoNullish = deepCloneObject(obj, true)
```

### deepMerge

Deeply merge the values of two objects into a new object. If the values are objects or arrays, it creates new objects/arrays with the original values, ensuring all values are copied with new references. This function has two optional arguments: `priority`, which prioritizes the values of `source`, `target`, or `object` (default is `source`), and `nullish`, which determines whether to ignore nullish values.

```ts
import { deepMerge } from "@halvaradop/obstackle/deep"

const source = {
  foo: {
    foobar: 1,
  },
  nullish: null,
  empty: undefined,
}

const target = {
  foo: {
    foobar: {
      foofoo: "bar",
    },
  },
  barfoo: 4,
}

/**
 * Expected:
 * {
 *   foo: {
 *     foobar: 1
 *   },
 *   barfoo: 4,
 *   nullish: null,
 *   empty: undefined
 * }
 */
const prioritySource = deepMerge(source, target)

/**
 * Expected:
 * {
 *   foo: {
 *     foobar: {
 *       foofoo: "bar
 *     }
 *   },
 *   nullish: null,
 *   empty: undefined,
 *   barfoo: 4
 * }
 */
const priorityObjects = deepMerge(source, target, true)

/**
 * Expected:
 * {
 *   foo: {
 *     foobar: {
 *       foofoo: "bar
 *     }
 *   },
 *   barfoo: 4
 * }
 */
const skipNullish = deepMerge(source, target, true, true)
```

### get

Get a value from an object using a dot-separated path. Optionally provide a default value if the path does not exist.

```ts
import { get } from "@halvaradop/obstackle/get"

const obj = { foo: { bar: { fizz: "buzz" } } }

// Expected: "buzz"
const value = get(obj, "foo.bar.fizz")

// Expected: "default"
const fallback = get(obj, "foo.bar.baz", "default")
```

### has

Check if a (possibly nested) key exists in an object using dot notation.

```ts
import { has } from "@halvaradop/obstackle/has"

const user = { username: "john", address: { city: "NY" } }

// Expected: true
const hasUsername = has(user, "username")

// Expected: true
const hasCity = has(user, "address.city")

// Expected: false
const hasZip = has(user, "address.zip")
```

### omit

Omit properties from an object by key(s), with optional deep copy.

```ts
import { omit } from "@halvaradop/obstackle/omit"

const user = { username: "john", password: "123", email: "john@gmail.com" }

// Expected: { username: "john", email: "john@gmail.com" }
const noPassword = omit(user, "password")

// Expected: { username: "john", email: "john@gmail.com" }
const noPasswordArr = omit(user, ["password"])
```

### deepOmit

Omit properties from an object at any depth by dot-separated key(s).

```ts
import { deepOmit } from "@halvaradop/obstackle/{deep,omit}"

const obj = { a: 1, b: { c: 2, d: 3 } }

// Expected: { a: 1, b: { d: 3 } }
const result = deepOmit(obj, "b.c")
```

### pick

Create a new object with only the picked key(s).

```ts
import { pick } from "@halvaradop/obstackle"

const user = { username: "john", password: "123", email: "john@gmail.com" }

// Expected: { username: "john", email: "john@gmail.com" }
const picked = pick(user, ["username", "email"])

// Expected: { username: "john" }
const pickedOne = pick(user, "username")
```

### set

Set a value in an object at a given path, with option to return a new copy.

```ts
import { set } from "@halvaradop/obstackle/set"

const obj = { foo: "bar", bar: { baz: 1 } }

// Expected: { foo: "bar", bar: { baz: 2 } }
const updated = set(obj, "bar.baz", 2, true)
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

We welcome and appreciate contributions to the `@halvaradop/obstackle` package. Whether you want to report bugs, suggest enhancements, or submit pull requests, your input helps us improve and grow the project. All experience levels are encouraged to participate!

To get started, please read our [Contributing Guide](https://github.com/halvaradop/.github/blob/master/.github/CONTRIBUTING.md). All contributors are expected to follow our [Code of Conduct](https://github.com/halvaradop/.github/blob/master/.github/CODE_OF_CONDUCT.md).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/halvaradop">Hernan Alvarado</a>
</p>
