import {Router} from "express";

const router = Router({
    mergeParams: true,
});
export default router;

import {Algorithm} from "../../../algorithm";

router.get("/", async (req, res) => {
    try {
        return res.status(200).json(await Algorithm.find(req.params.id));
    } catch (error) {
        return res.status(500).json({
            code: "SERVER_ERROR",
            message: error.message,
        });
    }
});

router.delete("/", async (req, res) => {
    try {
        return res.status(200).json(await Algorithm.remove(req.params.id));
    } catch (error) {
        return res.status(500).json({
            code: "SERVER_ERROR",
            message: error.message,
        });
    }
});

router.put("/", async (req, res) => {
    try {
        return res.status(200).json(await Algorithm.update({
            description: req.body.description,
            id: req.params.id,
            name: req.body.name,
        }));
    } catch (error) {
        return res.status(500).json({
            code: "SERVER_ERROR",
            message: error.message,
        });
    }
});
