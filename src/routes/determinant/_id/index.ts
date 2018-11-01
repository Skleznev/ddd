import {Router} from "express";

const router = Router({
    mergeParams: true,
});
export default router;

import {Determinant} from "../../../determinant";

router.get("/", async (req, res) => {
    try {
        return res.status(200).json(await Determinant.find(req.params.id));
    } catch (error) {
        return res.status(500).json({
            code: "SERVER_ERROR",
            message: error.message,
        });
    }
});

router.delete("/", async (req, res) => {
    try {
        return res.status(200).json(await Determinant.remove(req.params.id));
    } catch (error) {
        return res.status(500).json({
            code: "SERVER_ERROR",
            message: error.message,
        });
    }
});
