import { Request, Response } from "express";
import Feed from "../models/feed";
import { AuthRequest } from "../types/auth-request";

// Get feed posts
export const getFeed = async (_req: AuthRequest, res: Response) => {
  try {
    const posts = await Feed.find()
      .populate("author", "fullName email")
      .sort({ createdAt: -1 });

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feed" });
  }
};

// Create a new feed post
export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content is required" });
    }

    const post = await Feed.create({
      content,
      author: req.user._id
    });

    const populatedPost = await post.populate("author", "fullName email");

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post" });
  }
};
