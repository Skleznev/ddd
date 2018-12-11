import {Router} from "express";

import {pool} from "src";

const router = Router();
export default router;

router.use(async (req, res, next) => {
  try {
    const result = await pool
      .query("INSERT INTO algorithms(description, name) VALUES ($1, $2) RETURNING id;",
        [req.body.description, req.body.name]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});
