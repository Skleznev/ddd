import {Expression} from "./expression";
import {IBinaryExpression} from "./iexpression";

export class BinaryExpression extends Expression {
  private _operation: string;
  private readonly _firstOperand: Expression;
  private readonly _secondOperand: Expression;

  public constructor(args: IBinaryExpression) {
    super();
    this._operation = args.op;
    this._firstOperand = Expression._parse(args.fo);
    this._secondOperand = Expression._parse(args.so);
    this.calculateLevels();
  }

  private calculateLevels() {
    let levelsFirstOperand: Expression[][] = [];
    let levelsSecondOperand: Expression[][] = [];
    if (this._firstOperand) {
      levelsFirstOperand = this._firstOperand.levels;
    }
    if (this._secondOperand) {
      levelsSecondOperand = this._secondOperand.levels;
    }
    this._levels = new Array<Expression[]>(Math.max(levelsFirstOperand.length, levelsSecondOperand.length) + 1);
    for (let i = 0; i < this._levels.length - 1; ++i) {
      this._levels[i] = [];
      if (i < levelsFirstOperand.length) {
        levelsFirstOperand[i].forEach((item) => this._levels[i].push(item));
      }
      if (i < levelsSecondOperand.length) {
        levelsSecondOperand[i].forEach((item) => this._levels[i].push(item));
      }
    }
    this._levels[this._levels.length - 1] = [];
    this._levels[this._levels.length - 1].push(this);
  }
}
