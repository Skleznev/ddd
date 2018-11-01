import {Router} from "express";

const router = Router();
export default router;

import _id from "./_id";

router.use("/:id", _id);
