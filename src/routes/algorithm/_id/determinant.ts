import {Router} from "express";

const router = Router({
    mergeParams: true,
});
export default router;

import {Determinant} from "../../../determinant";

router.post("/", async (req, res) => {
    try {
        return res.status(200).json(await Determinant.create({
            algorithm: req.params.id,
            dimensions: req.body.dimensions,
            expression: req.body.expression,
        }));
    } catch (error) {
        return res.status(500).json({
            code: "SERVER_ERROR",
            message: error.message,
        });
    }
});
