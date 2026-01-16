import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { AuthRequest } from "../types/auth-request";


export const searchUsers = async (
    req: Request<{}, {}, {}, { q?: string }>,
  res: Response
) => {
  console.log("SEARCH HIT", req.query.q);
  try {
    const q = req.query.q;

    if (!q || q.trim() === "") {
      return res.json({ users: [] });
    }

    const users = await User.find({
      $or: [
        { fullName: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ],
    }).select("_id fullName email");

    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};

// export const searchUsers = async (req: Request<{}, {}, {}, { q?: string }>, res: Response) => {
//   console.log("🔥 SEARCH ROUTE HIT");
//   console.log("Query:", req.query);

//   const q = req.query.q as string;

//   if (!q) {
//     return res.json({ users: [] });
//   }

//   const users = await User.find({
//     fullName: { $regex: q, $options: "i" }
//   }).select("fullName email");

//   res.json({ users });
// };






export const getMyProfile = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json({ profile: req.user });
};

export const updateMyProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { fullName, password } = req.body;
      const allowedUpdates = [
    "fullName",
    "bio",
    "phone",
    "skills",
    "interests",
    "experienceLevel",
    "availability",
    "location",
  ];

  const updates: any = {};
  for (const key of allowedUpdates) {
    if (req.body[key] !== undefined) {
      updates[key] = req.body[key];
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    updates,
    { new: true }
  ).select("-password");

  res.json({ profile: updatedUser });


    // ✅ Update allowed fields only
    if (fullName) {
      req.user.fullName = fullName;
    }

    if (password && password.length >= 6) {
      req.user.password = await bcrypt.hash(password, 10);
    }

    await req.user.save();

    res.json({
      profile: {
        fullName: req.user.fullName,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};



export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select(
    "fullName email role"
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ user });
};
