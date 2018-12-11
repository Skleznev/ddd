import {Expression} from "./expression";

export class ExpressionsList extends Expression {
  private readonly _elements: Expression[];

  public constructor(elements: Expression[]) {
    super();
    this._elements = elements;
    this.calculateLevels();
  }

  private calculateLevels() {
    const levelsElements: Expression[][][] = new Array<Expression[][]>(this._elements.length);
    let n = 0;
    for (let i = 0; i < levelsElements.length; ++i) {
      if (this._elements[i] != null) {
        levelsElements[i] = this._elements[i].levels;
      } else {
        levelsElements[i] = [];
      }
      if (levelsElements[i].length > n) {
        n = levelsElements[i].length;
      }
    }
    this._levels = new Array<Expression[]>(n);
    for (let i = 0; i < this._levels.length; ++i) {
      this._levels[i] = [];
      for (const item of levelsElements) {
        if (i < item.length) {
          item[i].forEach((x) => this._levels[i].push(x));
        }
      }
    }
  }
}
