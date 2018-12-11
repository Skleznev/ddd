export interface IVariable {
  /**
   * Name
   */
  n: string;
}

export function isIVariable(object: any): object is IVariable {
  return "n" in object;
}

export interface INumber {
  /**
   * Value
   */
  v: number;
}

export function isINumber(object: any): object is INumber {
  return "v" in object;
}

export interface IUnaryExpression {
  /**
   * Operation
   */
  op: string;

  /**
   * Operand
   */
  od: IExpression;
}

export function isIUnaryExpression(object: any): object is IUnaryExpression {
  return "op" in object && "od" in object;
}

export interface IBinaryExpression {
  /**
   * Operation
   */
  op: string;

  /**
   * First operation
   */
  fo: IExpression;

  /**
   * Second operation
   */
  so: IExpression;
}

export function isIBinaryExpression(object: any): object is IBinaryExpression {
  return "op" in object && "fo" in object && "so" in object;
}

export interface IConditionalPair {
  /**
   * Condition
   */
  c: IExpression;

  /**
   * Value
   */
  v: IExpression;
}

export function isIConditionalPair(object: any): object is IConditionalPair {
  return "c" in object && "v" in object;
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
