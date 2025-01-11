export const randomChoice = <T>(elements: Array<T>): T => {
  return elements[Math.floor(Math.random() * elements.length)];
};
