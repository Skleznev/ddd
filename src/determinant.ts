import {pool} from "./db";
import {Expression, IExpression} from "./expression";

/**
 * Determinant data interface
 */
export interface IDeterminant {
    /**
     * ID
     */
    id: string;

    /**
     * Algorithm's ID
     */
    algorithm: string;

    /**
     * Dimensions
     */
    dimensions: number[];

    /**
     * Expression
     */
    expression: IExpression;

    /**
     * Processors (determinant width)
     */
    processors: number;

    /**
     * Ticks (determinant height)
     */
    ticks: number;
}

export class Determinant {
    /**
     * Find determinant
     * @param {string} id
     * @returns {Promise<IDeterminant>}
     * @throws Error
     */
    public static async find(id: string): Promise<IDeterminant> {
        // language=PostgreSQL
        const result = (await pool.query("SELECT * FROM determinants WHERE id = $1;", [id])).rows[0];
        return Determinant.result2IDeterminant(result);
    }

    /**
     * Create determinant
     * @param args Args
     * @returns {Promise<IDeterminant>}
     * @throws Error
     */
    public static async create(args: {
        /**
         * Algorithm's ID
         */
        algorithm: string;

        /**
         * Dimensions
         */
        dimensions: number[];

        /**
         * Expression
         */
        expression: IExpression,
    }): Promise<IDeterminant> {
        const expression = Expression.parse(args.expression);
        // language=PostgreSQL
        const result = (await pool.query(
            "INSERT INTO determinants (algorithm, dimensions, expression, processors, ticks)" +
            "VALUES ($1, $2, $3, $4, $5)" +
            "RETURNING *;",
            [
                args.algorithm,
                JSON.stringify(args.dimensions),
                JSON.stringify(args.expression),
                expression.processors,
                expression.ticks,
            ])).rows[0];
        return Determinant.result2IDeterminant(result);
    }

    /**
     * Remove determinant
     * @returns {Promise<void>}
     * @throws Error
     */
    public static async remove(id: string) {
        // language=PostgreSQL
        await pool.query("DELETE FROM determinants WHERE id = $1;", [id]);
    }

    /**
     * Convert result from DB to determinant
     * @param result
     * @returns {IDeterminant}
     */
    public static result2IDeterminant(result: any): IDeterminant {
        return {
            algorithm: result.algorithm,
            dimensions: result.dimensions,
            expression: result.expression,
            id: result.id,
            processors: result.processors,
            ticks: result.ticks,
        };
    }
}
