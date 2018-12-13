import {Router} from "express";

import {requireUser} from "../../src";

const router = Router();
export default router;

router.use(requireUser);

router.use((req, res, next) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
});
