import {pool} from "./db";
import {Determinant, IDeterminant} from "./determinant";

/**
 * Algorithm data interface
 */
export interface IAlgorithm {
    /**
     * Description
     */
    description: string;

    /**
     * ID
     */
    id: string;

    /**
     * Name
     */
    name: string;
}

/**
 * Algorithm
 */
export class Algorithm {
    /**
     * Get all algorithms
     * @returns {Promise<IAlgorithm[]>}
     * @throws Error
     */
    public static async all(): Promise<IAlgorithm[]> {
        // language=PostgreSQL
        return (await pool.query("SELECT * FROM algorithms ORDER BY id ASC;")).rows.map(Algorithm.result2IAlgorithm);
    }

    /**
     * Find algorithm
     * @param {string} id ID
     * @returns {Promise<IAlgorithm>}
     */
    public static async find(id: string): Promise<IAlgorithm> {
        // language=PostgreSQL
        const result = (await pool.query("SELECT * FROM algorithms WHERE id = $1;", [id])).rows[0];
        return Algorithm.result2IAlgorithm(result);
    }

    /**
     * Create algorithm
     * @param args Args
     * @returns {Promise<IAlgorithm>}
     * @throws Error
     */
    public static async create(args: {
        /**
         * Name
         */
        name: string,

        /**
         * Description
         */
        description: string,
    }): Promise<IAlgorithm> {
        // language=PostgreSQL
        const result = (await pool.query(
            "INSERT INTO algorithms(description, name) VALUES ($1, $2) RETURNING *;",
            [args.description, args.name])).rows[0];
        return Algorithm.result2IAlgorithm(result);
    }

    /**
     * Update algorithm in DB
     * @param {IAlgorithm} algorithm
     * @returns {Promise<IAlgorithm>}
     * @throws Error
     */
    public static async update(algorithm: IAlgorithm): Promise<IAlgorithm> {
        // language=PostgreSQL
        const result = (await pool.query(
            "UPDATE algorithms SET description = $2, name = $1 WHERE id = $3 RETURNING *;",
            [algorithm.name, algorithm.description, algorithm.id])).rows[0];
        return Algorithm.result2IAlgorithm(result);
    }

    /**
     * Remove algorithm
     * @returns {Promise<void>}
     * @throws Error
     */
    public static async remove(id: string) {
        // language=PostgreSQL
        await pool.query("DELETE FROM algorithms WHERE id = $1;", [id]);
    }

    /**
     * Get all determinants for algorithm
     * @param {string} id ID
     * @returns {Promise<IDeterminant[]>}
     * @throws Error
     */
    public static async determinants(id: string): Promise<IDeterminant[]> {
        // language=PostgreSQL
        return (await pool.query("SELECT * FROM determinants WHERE algorithm = $1 ORDER BY id ASC;", [id]))
            .rows.map(Determinant.result2IDeterminant);
    }

    /**
     * Compare two algorithms
     * @param {string} id1 ID #1
     * @param {string} id2 ID #2
     * @returns {Promise}
     * @throws Error
     */
    public static async compare(id1: string, id2: string): Promise<{
        /**
         * Compare result for processors
         */
        processors: number,

        /**
         * Compare result for ticks
         */
        ticks: number,
    }> {
        const determinants1 = await Algorithm.determinants(id1);
        const determinants2 = await Algorithm.determinants(id2);
        let processors = 0;
        let ticks = 0;
        for (const item1 of determinants1) {
            for (const item2 of determinants2) {
                if (item1.dimensions.length !== item2.dimensions.length) {
                    continue;
                }
                let isEqual = true;
                for (let i = 0; i < item1.dimensions.length; ++i) {
                    if (item1.dimensions[i] !== item2.dimensions[i]) {
                        isEqual = false;
                        break;
                    }
                }
                if (isEqual) {
                    processors += item1.processors - item2.processors;
                    ticks += item1.ticks - item2.ticks;
                }
            }
        }
        return {
            processors,
            ticks,
        };
    }

    /**
     * Convert result from DB to algorithm
     * @param result
     * @returns {IAlgorithm}
     */
    public static result2IAlgorithm(result: any): IAlgorithm {
        return {
            description: result.description,
            id: result.id,
            name: result.name,
        };
    }
}
