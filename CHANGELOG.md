# @halvaradop/obstackle

## [Unreleased]

### Breaking Changes

- The `deepClone` function now utilizes the new `deepCloneObject` and the renamed `deepCloneArray` (formerly `deepCopyArray`) for deep cloning of arrays and objects. This may affect custom implementations relying on previous behaviors. [#31](https://github.com/halvaradop/obstackle/pull/31)

### Added

- Introduced `getKeyFromPath` for extracting the current key and traversed path, improving operations on deeply nested keys. [#32](https://github.com/halvaradop/obstackle/pull/32)
- Added `deepCloneObject` in `deep.ts` for deep cloning of objects. [#31](https://github.com/halvaradop/obstackle/pull/31)
- Added `deepClone` and `deepCloneArray` in `clone.ts` for deep cloning of objects and arrays. [#25](https://github.com/halvaradop/obstackle/pull/25)
- Added `set` in `set.ts` to update values by key, with optional deep cloning. [#24](https://github.com/halvaradop/obstackle/pull/24)
- Added `get` in `get.ts` to retrieve values by key. [#23](https://github.com/halvaradop/obstackle/pull/23)
- Added `has` in `has.ts` to check for key existence within objects. [#22](https://github.com/halvaradop/obstackle/pull/22)

### Changed

- Optimized `get`, `has`, and `set` functions to leverage `getKeyFromPath` for improved performance and accuracy when handling nested keys. [#32](https://github.com/halvaradop/obstackle/pull/32)

### Fixed

- Improved return types for `get`, `has`, `set`, `pick`, `deepOmit`, and `deepPick` by integrating `@halvaradop/ts-utility-types@0.20.0`, ensuring more accurate and robust type inference. [#32](https://github.com/halvaradop/obstackle/pull/32)

---

## [0.1.0] - 2025-04-03

### Added

- Introduced `pick` in `pick.ts` to create objects from specified keys. [#16](https://github.com/halvaradop/obstackle/pull/16)
- Added `deepOmit` in `omit.ts` for excluding keys at any depth. [#15](https://github.com/halvaradop/obstackle/pull/15)
- Added `omit` in `omit.ts` for shallow key exclusion. [#14](https://github.com/halvaradop/obstackle/pull/14)
- Added `deep.ts` for shared deep operation logic, consolidating `deep-merge.ts` and `deep-copy-array.ts`, and renamed `merge` to `deepMerge`. [#13](https://github.com/halvaradop/obstackle/pull/13)
- Added `deepCopyArray` for deep cloning arrays and `isSimpleType` for primitive/function checks. [#5](https://github.com/halvaradop/obstackle/pull/5)
- Added `merge` for deep merging of objects in `deep-merge`. [#3](https://github.com/halvaradop/obstackle/pull/3)

### Fixed

- Enhanced return types for `deepMerge`, `deepOmit`, and `pick` using `@halvaradop/ts-utility-types` (`DeepMerge`, `DeepKeys`, `DeepOmit`, `LiteralUnion`). Introduced `ArgumentKeys` type for improved array and union type handling. [#19](https://github.com/halvaradop/obstackle/pull/19)
