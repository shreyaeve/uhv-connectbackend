import { Request, Response } from "express";
import User from "../models/user";
import Project from "../models/Project";

// Dashboard stats
export const getStats = async (_req: Request, res: Response) => {
  try {
    const totalVolunteers = await User.countDocuments({ role: "volunteer" });
    const activeProjects = await Project.countDocuments({ status: "Active" });

    res.json({
      totalVolunteers,
      activeProjects
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load stats" });
  }
};

// Get unapproved volunteers
export const getPendingApplications = async (_req: Request, res: Response) => {
  try {
    const pending = await User.find({
      role: "volunteer",
      approved: false
    }).select("fullName email");

    res.json({ applications: pending });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pending applications" });
  }
};

// Approve / reject volunteer
export const reviewApplication = async (req: Request, res: Response) => {
  try {
    const { approved } = req.body;

    await User.findByIdAndUpdate(req.params.id, { approved });

    res.json({ message: "Application updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update application" });
  }
};
