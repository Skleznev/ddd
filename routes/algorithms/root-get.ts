import {Router} from "express";

import {pool} from "src";

const router = Router();
export default router;

router.use(async (req, res, next) => {
  try {
    const result = await pool
      .query("SELECT * FROM algorithms ORDER BY id ASC;");
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
});
