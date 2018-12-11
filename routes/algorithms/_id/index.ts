import {Router} from "express";

import determinants from "./determinants";
import root from "./root";

const router = Router({
  mergeParams: true,
});
export default router;

router.use("/determinants", determinants);
router.use("/", root);
