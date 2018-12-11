import {Router} from "express";

import _id from "./_id";
import root from "./root";

const router = Router({
  mergeParams: true,
});
export default router;

router.use("/:determinant_id", _id);
router.use("/", root);
