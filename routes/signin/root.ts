import {Router} from "express";

import $post from "./root-post";

const router = Router();
export default router;

router.post("/", $post);
