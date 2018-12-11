import {Router} from "express";

import {pool} from "src";

const router = Router({
  mergeParams: true,
});
export default router;

router.use(async (req, res, next) => {
  try {
    const result = await pool
      .query("SELECT * FROM determinants WHERE algorithm = $1 ORDER BY id ASC;",
        [req.params.algorithm_id]);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});
