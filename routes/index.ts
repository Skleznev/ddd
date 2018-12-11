import {Router} from "express";

import algorithms from "./algorithms";

const router = Router();
export default router;

router.use("/algorithms", algorithms);
