// prettier-ignore
export const lowerCaseHomeRow = ['a','s','d','f','g','h','j','k','l']
// prettier-ignore
export const lowerCaseBottomRow = ['z','x','c','v','b','n','m']
// prettier-ignore
export const lowerCaseTopRow = ['q','w','e','r','t','y','u','i','o','p']
// prettier-ignore
export const lowerCaseLetters = [...lowerCaseBottomRow, ...lowerCaseHomeRow, ...lowerCaseTopRow] as const
// prettier-ignore
export const upperCaseLetters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'] as const
// prettier-ignore
export const numbers = ['0','1','2','3','4','5','6','7','8','9'] as const
// prettier-ignore
export const symbols = ['`','~','!','@','#','$','%','^','&','*','(',')','-','_','=','+','[',']','{','}','\\',',',';',':','\'','"','.','/','<','>','?'] as const
// prettier-ignore
export const whiteSpace = [' ','\t','\n',"\b"] as const

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
