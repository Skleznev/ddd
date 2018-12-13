// tslint:disable:no-reference
/// <reference path="../types/express.d.ts"/>

import * as util from "util";

import {NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";

export async function auth(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    try {
      req.user = ((await util
        .promisify((callback) => jwt.verify(req.token, process.env.JWT_SECRET as string, callback))()) as any).user;
      next();
    } catch (error) {
      req.user = undefined;
      next();
    }
  } catch (error) {
    next(error);
  }
}

export function requireUser(req: Request, res: Response, next: NextFunction): void {
  try {
    if (req.user) {
      next();
    } else {
      res.status(401).json({
        code: "REQUIRED_USER",
        message: "required user",
      });
    }
  } catch (error) {
    next(error);
  }
}
