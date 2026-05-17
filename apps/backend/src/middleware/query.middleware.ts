import { NextFunction, Request, Response } from "express";

export const validateQuery = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { term } = req.query;

  if (typeof term !== "string") {
    return res.status(400).json({ error: "term must be a string" });
  }

  next();
};
