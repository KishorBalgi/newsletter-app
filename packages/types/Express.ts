import { Request } from "express";
import { Author } from "./Author";

export interface RequestWithAuthor extends Request {
  author: Author;
}
