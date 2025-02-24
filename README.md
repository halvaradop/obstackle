# @halvaradop/obstackle

This library provides toolkits with utilities, functionalities, and methods for object manipulation. The code is written in `TypeScript`, offering autocomplete for the functionalities.

## Installation

Follow these steps to install the package in your project:

```sh
npm i @halvaradop/obstackle
# or
pnpm add @halvaradop/obstackle
```

## Table of Contents

- [deepMerge](#deepmerge)
- [deepCopyArray](#deepcopyarray)

### deepMerge

Deeply merge the values of two objects into a new object. If the values are objects or arrays, it creates new objects/arrays with the original values, ensuring all values are copied with new references. This function has two optional arguments: `priority`, which prioritizes the values of `source`, `target`, or `object` (default is `source`), and `nullish`, which determines whether to ignore nullish values.

```ts
import { merge } from "@halvaradop/obstackle"

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
 *   barfoo: 4
 * }
 */
const prioritySource = merge(source, target)

/**
 * Expected:
 * {
 *   foo: {
 *     foobar: {
 *       foofoo: "bar"
 *     }
 *   },
 *   barfoo: 4
 * }
 */
const priorityTarget = merge(source, target, "target")

/**
 * Expected:
 * {
 *   foo: {
 *     foobar: {
 *       foofoo: "bar"
 *     }
 *   },
 *   nullish: null,
 *   empty: undefined,
 *   barfoo: 4
 * }
 */
const withNullishValues = merge(source, target, "source", true)
```

### deepCopyArray

Create a deep copy of the provided array. If the array contains objects or other arrays, it creates new references.

```ts
import { deepCopyArray } from "@halvaradop/obstackle"

/**
 * Expected:
 * [1, true, "str", { copy: 1 }]
 */
const copy = deepCopyArray([1, true, "str", { copy: 1 }])
```
