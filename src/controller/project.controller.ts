import { Request, Response } from "express";
import Project from "../models/Project";

// GET ALL PROJECTS
export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

// GET SINGLE PROJECT
export const getProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ project });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch project" });
  }
};

// CREATE PROJECT
export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: "Failed to create project" });
  }
};
