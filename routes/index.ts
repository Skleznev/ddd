import {Router} from "express";

import algorithms from "./algorithms";
import signin from "./signin";
import whoami from "./whoami";

const router = Router();
export default router;

router.use("/algorithms", algorithms);
router.use("/signin", signin);
router.use("/whoami", whoami);
