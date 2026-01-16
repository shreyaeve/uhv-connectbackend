import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";

// helper to sign JWT
const sign = (id: string): string => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );
};

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashed,
      role: "volunteer",
      approved: false,
    });

    const token = sign(user._id.toString());

    res.status(201).json({
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email }) as IUser | null;

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // password is guaranteed here
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = sign(user._id.toString());

    res.json({
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};
