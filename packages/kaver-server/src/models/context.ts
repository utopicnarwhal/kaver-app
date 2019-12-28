import { Request, Response } from "express";
import { Token } from "./token";

export interface IContext {
    req: Request;
    res: Response;
    token?: Token;
}
