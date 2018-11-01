import {Router} from "express";

const router = Router({
    mergeParams: true,
});
export default router;

import {Algorithm} from "../../../algorithm";

router.get("/", async (req, res) => {
    try {
        return res.status(200).json(await Algorithm.determinants(req.params.id));
    } catch (error) {
        return res.status(500).json({
            code: "SERVER_ERROR",
            message: error.message,
        });
    }
});
