import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as morgan from "morgan";

const app = express();
export {app};

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

import routes from "./routes";

app.use("/", routes);
