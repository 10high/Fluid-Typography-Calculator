#Fluid Typogrography Calculator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Live Preview Here](https://flyingtens.com/FluidTypographyCalculator)

## What is it?

A calculator that takes your desired `minimum screen width`, `maximum screen width` and the `minimum` and `maximum clamp` sizes in `pixels` that should be used at each end of the range.

It returns a `CSS clamp()` property and value in `rem` that will scale the element smoothly within that range. This can be used for font sizes but also margins etc.

Input can be entered by keyboard or the onscreen keypad. Shorcuts for `perform calculation` and `clear all inputs` are `Enter` and `C`, respectively.

There is also an option to annotate the result with the original pixel values as a comment.

## How to use

- Clone the repository on your local machine.
- Install the dependencies with `npm install`.
- Please report bugs and suggestions using this repository's [issue tracker](https://github.com/10high/Fluid-Typography-Calculator/issues).

### Notes

- This project is built in `Vite` with testing in `vitest` and `React Testing Library`.
- It is deployed under the nested public path `/FluidTypographyCalculator`. This is configured in `vite.config.js`, see [Public Base Path](https://vitejs.dev/guide/build.html#public-base-path) in the Vite Docs.

#### The original Figma design

![](/FluidTypographyDesign_Screenshot.png)
