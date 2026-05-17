import { NextFunction, Request, Response } from "express";

export const validateQuery = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const term = req.body.term;

  if (typeof term !== "string") {
    return res.status(400).json({ error: "query term must be a string" });
  }

  next();
};
