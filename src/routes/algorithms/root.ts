import {Router} from "express";

const router = Router();
export default router;

import {Algorithm} from "../../algorithm";

router.get("/", async (req, res) => {
    try {
        return res.status(200).json(await Algorithm.all());
    } catch (error) {
        return res.status(500).json({
            code: "SERVER_ERROR",
            message: error.message,
        });
    }
});
