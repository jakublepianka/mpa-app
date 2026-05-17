import { NextFunction, Request, Response } from "express";

export const validateClientId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const clientId = req.headers["client-id"];

  if (typeof clientId !== "string") {
    return res.status(400).json({
      error: "Missing client-id header",
    });
  }

  next();
};
