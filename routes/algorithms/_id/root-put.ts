import {Router} from "express";

import {pool} from "src";

const router = Router({
  mergeParams: true,
});
export default router;

router.use(async (req, res, next) => {
  try {
    await pool
      .query("UPDATE algorithms SET description = $1, name = $2 WHERE id = $3;",
        [req.body.description, req.body.name, req.params.algorithm_id]);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});
