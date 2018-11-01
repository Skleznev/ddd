import {Router} from "express";

const router = Router();
export default router;

import _id from "./_id";
import root from "./root";

router.use("/:id", _id);
router.use("/", root);
