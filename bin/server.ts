import "../global";

import * as debug from "debug";

import {app} from "src";

app.listen(process.env.PORT, () => {
  debug("qbaseserver")(`Listen on port ${process.env.PORT}`);
});
