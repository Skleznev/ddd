import {Router} from "express";

import _id from "./_id";
import compare from "./compare";
import root from "./root";

const router = Router();
export default router;

router.use("/:algorithm_id", _id);
router.use("/compare", compare);
router.use("/", root);
