import {Router} from "express";

const router = Router();
export default router;

import {Algorithm} from "../../algorithm";

router.post("/", async (req, res) => {
    try {
        return res.status(200).json(await Algorithm.compare(req.body.id1, req.body.id2));
    } catch (error) {
        return res.status(500).json({
            code: "SERVER_ERROR",
            message: error.message,
        });
    }
});
