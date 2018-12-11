import {Router} from "express";

import _id1_id2 from "./_id1_id2";

const router = Router();
export default router;

router.use("/:id1-:id2", _id1_id2);
