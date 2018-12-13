import * as util from "util";

import {Router} from "express";
import * as jwt from "jsonwebtoken";

const router = Router();
export default router;

const users = Object.keys(process.env)
  .filter((k) => /^user.*$/i.test(k))
  .map((k) => {
    const [user, password] = (process.env[k] as string).split(":");
    return {user, password};
  });

router.use(async (req, res, next) => {
  try {
    if (users.some((u) => u.user === req.body.user && u.password === req.body.password)) {
      res.status(200).json({
        token: await util.promisify((callback) =>
          jwt.sign({user: req.body.user}, process.env.JWT_SECRET as string, {expiresIn: "100y"}, callback))(),
      });
    } else {
      res.status(400).json({
        code: "WRONG_USER_OR_PASSWORD",
        message: "user with same name and password not found",
      });
    }
  } catch (error) {
    next(error);
  }
});
