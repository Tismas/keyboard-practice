// prettier-ignore
export const lowerCaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] as const
// prettier-ignore
export const upperCaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] as const
// prettier-ignore
export const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const
// prettier-ignore
export const symbols = ['`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', '\\', ',', ';', ':', '\'', '"', ',', '.', '/', '<', '>', '?'] as const
// prettier-ignore
export const whiteSpace = [' ', '\t', '\n', "\b"] as const

export type LowerCaseLetters = (typeof lowerCaseLetters)[number];
export type UpperCaseLetters = (typeof upperCaseLetters)[number];
export type Numbers = (typeof numbers)[number];
export type Symbols = (typeof symbols)[number];
export type WhiteSpace = (typeof whiteSpace)[number];

export type KeyboardCharacter =
  | LowerCaseLetters
  | UpperCaseLetters
  | Numbers
  | Symbols
  | WhiteSpace;
