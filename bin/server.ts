import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
    path: path.resolve(__dirname, "../../.env"),
});

import {app, Debug} from "../";

app.listen(process.env.PORT, () => {
    Debug.log(`Listen on port ${process.env.PORT}`);
});
