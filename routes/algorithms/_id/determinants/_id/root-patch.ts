import {Router} from "express";

import {pool} from "src";

const router = Router({
  mergeParams: true,
});
export default router;

router.use(async (req, res, next) => {
  try {
    await pool.query("UPDATE determinants SET iterations = $1 WHERE id = $2 AND algorithm = $3;",
      [req.body.iterations, req.params.determinant_id, req.params.algorithm_id]);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});
