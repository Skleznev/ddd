import {Expression} from "./expression";
import {IUnaryExpression} from "./iexpression";

export class UnaryExpression extends Expression {
    private _operation: string;
    private _operand: Expression;

    public constructor(args: IUnaryExpression) {
        super();
        this._operation = args.op;
        this._operand = Expression._parse(args.od);
        this.calculateLevels();
    }

    private calculateLevels() {
        const levelsOperand: Expression[][] = this._operand ? this._operand.levels : [];
        this._levels = new Array<Expression[]>(levelsOperand.length + 1);
        for (let i = 0; i < levelsOperand.length; ++i) {
            this._levels[i] = levelsOperand[i];
        }
        this._levels[this._levels.length - 1] = [this];
    }
}
