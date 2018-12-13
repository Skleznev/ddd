export {};

declare global {
  namespace Express {
    // tslint:disable-next-line
    export interface Request {
      readonly token: string;
      user?: string;
    }
  }
}
