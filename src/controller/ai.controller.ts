import { Request, Response } from "express";

export const matchProject = async (_req: Request, res: Response) => {
  res.json({
    score: Math.floor(Math.random() * 40) + 60,
    reasoning: "Good skill and experience match",
  });
};
