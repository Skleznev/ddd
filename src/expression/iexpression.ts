export interface IVariable {
    name: string;
}

export function isIVariable(object: any): object is IVariable {
    return "name" in object;
}

export interface INumber {
    value: number;
}

export function isINumber(object: any): object is INumber {
    return "value" in object;
}

export interface IUnaryExpression {
    operation: string;
    operand: IExpression;
}

export function isIUnaryExpression(object: any): object is IUnaryExpression {
    return "operation" in object && "operand" in object;
}

export interface IBinaryExpression {
    operation: string;
    firstOperand: IExpression;
    secondOperand: IExpression;
}

export function isIBinaryExpression(object: any): object is IBinaryExpression {
    return "operation" in object && "firstOperand" in object && "secondOperand" in object;
}

export interface IConditionalPair {
    condition: IExpression;
    value: IExpression;
}

export function isIConditionalPair(object: any): object is IConditionalPair {
    return "condition" in object && "value" in object;
}

export type IBaseExpression =
    IVariable
    | INumber
    | IUnaryExpression
    | IBinaryExpression
    | IConditionalPair
    | string
    | number;

export type IExpression = IBaseExpression | IBaseExpression[];
