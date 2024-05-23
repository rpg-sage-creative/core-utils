# rpg-sage-creative/core-utils

This repo is a utils collection for RSC projects.
It's purpose is simply to provide reusable code.
It contains the utility logic most commonly used throughout RSC repos.

## src/console

Some of the functions in this repo are designed for debugging/logging.

## src/test

Some of the functions in this repo are designed for unit testing.

## src/types

Some of the functions and objects in this repo are common types and commonly reused object/type based methods.

## scripts

Included in this repo are scripts for building a repo, releasing a repo (creating a git tag), and testing a repo. Projects that depend on this repo for these features can see https://github.com/rpg-sage-creative/utils-template for how to implement them.

One of the actions performed by the build script is to create an `index.ts` file in each descendant of `/src`. These `index.ts` files are simply a collection of `export * from "";` for each `.ts` file in the folder. Folders named "internal" will be excluded from these `index.ts` folders, but they will have their own `index.ts` folder created.

## Notes about tsdoc / jsdoc

The build scripts included in this repo perform a dual pass build. One builds everything with an entire tsdoc. The second redoes the tsdoc files to remove any documentation with `@internal` in the description.

### History

It was created by combining `console-utils`, `test-utils`, and `type-utils` into a single repo.