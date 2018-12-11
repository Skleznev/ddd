import {Router} from "express";

import {Expression, pool} from "src";

const router = Router({
  mergeParams: true,
});
export default router;

router.use(async (req, res, next) => {
  try {
    const expression = Expression.parse(req.body.expression);
    const result = await pool
    // tslint:disable-next-line
      .query("INSERT INTO determinants(algorithm, dimensions, expression, processors, ticks, iterations) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;", [
        req.params.algorithm_id,
        JSON.stringify(req.body.dimensions),
        JSON.stringify(req.body.expression),
        expression.processors,
        expression.ticks,
        parseInt(String(req.body.iterations), 10) || 0,
      ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});
