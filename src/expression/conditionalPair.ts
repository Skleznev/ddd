import {Expression} from "./expression";
import {IConditionalPair} from "./iexpression";

export class ConditionalPair extends Expression {
    private _condition: Expression;
    private _value: Expression;

    public constructor(args: IConditionalPair) {
        super();
        this._condition = Expression.parse(args.condition);
        this._value = Expression.parse(args.value);
        this.calculateLevels();
    }

    private calculateLevels() {
        let levelsCondition: Expression[][] = [];
        let levelsValue: Expression[][] = [];
        if (this._condition) {
            levelsCondition = this._condition.levels;
        }
        if (this._value) {
            levelsValue = this._value.levels;
        }
        this._levels = new Array<Expression[]>(Math.max(levelsCondition.length, levelsValue.length));
        for (let i = 0; i < this._levels.length; ++i) {
            this._levels[i] = [];
            if (i < levelsCondition.length) {
                levelsCondition[i].forEach((item) => this._levels[i].push(item));
            }
            if (i < levelsValue.length) {
                levelsValue[i].forEach((item) => this._levels[i].push(item));
            }
        }
    }
}
