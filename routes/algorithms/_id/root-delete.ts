import {Router} from "express";

import {pool, requireUser} from "src";

const router = Router({
  mergeParams: true,
});
export default router;

router.use(requireUser);

router.use(async (req, res, next) => {
  try {
    await pool.query("DELETE FROM algorithms WHERE id = $1;",
      [req.params.algorithm_id]);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});
