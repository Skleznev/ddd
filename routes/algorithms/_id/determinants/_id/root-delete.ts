import {Router} from "express";

import {pool, requireUser} from "src";

const router = Router({
  mergeParams: true,
});
export default router;

router.use(requireUser);

router.use(async (req, res, next) => {
  try {
    await pool.query("DELETE FROM determinants WHERE id = $1 AND algorithm = $2;",
      [req.params.determinant_id, req.params.algorithm_id]);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});
