import {Router} from "express";

const router = Router();
export default router;

import compare from "./compare";
import root from "./root";

router.use("/compare", compare);
router.use("/", root);
