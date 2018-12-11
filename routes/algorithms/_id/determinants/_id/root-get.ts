import {Router} from "express";

import {pool} from "src";

const router = Router({
  mergeParams: true,
});
export default router;

router.use(async (req, res, next) => {
  try {
    const result = await pool
      .query("SELECT * FROM determinants WHERE id = $1 AND algorithm = $2;",
        [req.params.determinant_id, req.params.algorithm_id]);
    if (result.rows[0]) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});
