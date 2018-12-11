import {baseDir} from "../global";

import * as fs from "fs";
import * as http from "http";
import * as path from "path";
import * as util from "util";

import * as debug from "debug";
import "mocha";

// tslint:disable-next-line
const migrations: string[] = require(path.join(baseDir, "db", "migrations.json"));

import {app, pool} from "../src";

if (process.env.DEBUG) {
  debug.enable(process.env.DEBUG);
}

let server: http.Server;

beforeEach(async () => {
  await pool.query("DROP SCHEMA public CASCADE;");
  await pool.query("CREATE SCHEMA public;");
  for (const migration of migrations) {
    await pool.query(await util.promisify(fs.readFile)(path.join(baseDir, "db", migration), "utf8"));
  }
  await util.promisify((callback) => server = app.listen(process.env.PORT, callback))();
});

afterEach(async () => {
  await util.promisify((callback) => server.close(callback))();
});

process.on("uncaughtException", (error) => {
  // tslint:disable no-console
  console.error(error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  // tslint:disable no-console
  console.error(error);
  process.exit(1);
});
