declare module 'dotted-map' {
  export interface Point {
    x: number;
    y: number;
  }

  export interface ConstructorOptions {
    height: number;
    grid?: 'diagonal' | 'square';
  }

  export default class DottedMap {
    constructor(options: ConstructorOptions);
    getPoints(): Point[];
  }
}
