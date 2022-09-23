import { Request, Response, NextFunction } from "express";

export function errorResourceNotFound(
  __req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(404);
  res.json({ status: 404, message: "Route o resource not found" });
  next();
}
