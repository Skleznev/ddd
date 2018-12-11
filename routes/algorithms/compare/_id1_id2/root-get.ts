import {Router} from "express";
import * as _ from "lodash";

import {pool} from "src";

const router = Router({
  mergeParams: true,
});
export default router;

async function getDeterminants(algorithmId: string): Promise<Array<{
  dimensions: number[],
  processors: number;
  ticks: number;
}>> {
  const result = await pool
    .query("SELECT dimensions, processors, ticks FROM determinants WHERE algorithm = $1;",
      [algorithmId]);
  return result.rows;
}

router.use(async (req, res, next) => {
  try {
    const [determinants1, determinants2] = await Promise.all([
      getDeterminants(req.params.id1),
      getDeterminants(req.params.id2),
    ]);
    let processors = 0;
    let ticks = 0;
    for (const item1 of determinants1) {
      for (const item2 of determinants2) {
        if (_.isEqual(item1.dimensions, item2.dimensions)) {
          processors += item1.processors - item2.processors;
          ticks += item1.ticks - item2.ticks;
        }
      }
    }
    res.status(200).json({
      processors,
      ticks,
    });
  } catch (error) {
    next(error);
  }
});
