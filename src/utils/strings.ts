// 65 returns uppercase, 97 returns lowercase
export const generateAlphabet = (isUppercase: boolean = true) =>
  [...Array(26)].map((_, i) => String.fromCharCode(i + (isUppercase ? 65 : 97)));
