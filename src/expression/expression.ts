import {
    IBaseExpression,
    IExpression,
    isIBinaryExpression,
    isIConditionalPair,
    isINumber,
    isIUnaryExpression,
    isIVariable,
} from "./iexpression";

export class Expression {
    public static parse(obj: IExpression): Expression {
        if (obj instanceof Array) {
            return Expression.parseArray(obj);
        }
        if (typeof obj === "string") {
            return Expression.parseString(obj);
        }
        if (typeof obj === "number") {
            return Expression.parseNumber(obj);
        } else {
            return Expression.parseObj(obj);
        }
    }

    private static parseArray(obj: IBaseExpression[]): Expression {
        return new ExpressionsList(obj.map((item) => Expression.parse(item)));
    }

    private static parseString(obj: string): Expression {
        return new VariableExpression(obj);
    }

    private static parseNumber(obj: number): Expression {
        return new NumberExpression(obj);
    }

    private static parseObj(obj: IBaseExpression): Expression {
        if (isIConditionalPair(obj)) {
            return new ConditionalPair(obj);
        }
        if (isIBinaryExpression(obj)) {
            return new BinaryExpression(obj);
        }
        if (isIUnaryExpression(obj)) {
            return new UnaryExpression(obj);
        }
        if (isIVariable(obj)) {
            return new VariableExpression(obj.name);
        }
        if (isINumber(obj)) {
            return new NumberExpression(obj.value);
        }
        throw new Error("unknown type!");
    }

    protected _levels: Expression[][];

    public constructor() {
        this._levels = [];
    }

    public get levels(): Expression[][] {
        return this._levels;
    }

    public get ticks(): number {
        return this._levels.length;
    }

    public get processors(): number {
        let res = 0;
        for (const item of this._levels) {
            if (item.length > res) {
                res = item.length;
            }
        }
        return res;
    }
}

import {BinaryExpression} from "./binaryExpression";
import {ConditionalPair} from "./conditionalPair";
import {ExpressionsList} from "./expressionsList";
import {NumberExpression} from "./numberExpression";
import {UnaryExpression} from "./unaryExpression";
import {VariableExpression} from "./variableExpression";
