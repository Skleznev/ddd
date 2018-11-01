import * as assert from "assert";

import "mocha";

import {Expression} from "../src/expression";

describe("expression", () => {
    it("Квадратное уравнение", () => {
        const e = Expression.parse(require("./Квадратное уравнение.json"));
        assert.equal(e.ticks, 6);
        assert.equal(e.processors, 16);
    });
});
