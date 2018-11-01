import * as debugModule from "debug";

const debug = debugModule("qbaseserver");

export class Debug {
    public static log(message: any) {
        debug(message);
    }
}
