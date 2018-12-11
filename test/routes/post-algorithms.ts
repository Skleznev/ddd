import "../common";

import {expect} from "chai";
import * as supertest from "supertest";

import {app, pool} from "../../src";

describe("POST /algorithms", () => {
  it("correct", async () => {
    await supertest(app).post("/algorithms")
      .send({
        description: "Description",
        name: "Matrix",
      })
      .expect(201, {
        id: "1",
      });

    const result = await pool.query("SELECT * FROM algorithms;");
    expect(result.rows).have.lengthOf(1);
    expect(result.rows[0]).have.keys("id", "name", "description");
    expect(result.rows[0].id).equal("1");
    expect(result.rows[0].name).equal("Matrix");
    expect(result.rows[0].description).equal("Description");
  });
});
