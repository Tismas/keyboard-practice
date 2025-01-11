export class Vector2 {
  constructor(public x: number, public y: number) {}
}

export const randomChoice = <T>(elements: Array<T>): T => {
  return elements[Math.floor(Math.random() * elements.length)];
};
