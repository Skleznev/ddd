import {Router} from "express";

const router = Router();
export default router;

import algorithm from "./algorithm";
import algorithms from "./algorithms";
import determinant from "./determinant";

router.use("/algorithm", algorithm);
router.use("/algorithms", algorithms);
router.use("/determinant", determinant);
