import {Router} from "express";

import $get from "./root-get";

const router = Router();
export default router;

router.get("/", $get);
