import {Router} from "express";

import $delete from "./root-delete";
import $get from "./root-get";
import $patch from "./root-patch";

const router = Router({
  mergeParams: true,
});
export default router;

router.delete("/", $delete);
router.get("/", $get);
router.patch("/", $patch);
