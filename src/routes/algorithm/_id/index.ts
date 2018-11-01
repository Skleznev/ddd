import {Router} from "express";

const router = Router({
    mergeParams: true,
});
export default router;

import determinant from "./determinant";
import determinants from "./determinants";
import root from "./root";

router.use("/determinant", determinant);
router.use("/determinants", determinants);
router.use("/", root);
