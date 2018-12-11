import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import {NextFunction, Request, Response} from "express";
import * as morgan from "morgan";

import routes from "../routes";

const app = express();
export {app};

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json({
  limit: process.env.EXPRESS_BODY_PARSER_LIMIT_JSON,
}));

app.use("/", routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(500).json({
    code: "INTERNAL_SERVER_ERROR",
    message: error.message,
  });
});
