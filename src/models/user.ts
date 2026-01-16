import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;   // ✅ ADD THIS
  role: string;
  approved: boolean;

  bio?: string;
  phone?: string;
  skills?: string[];
  interests?: string[];
  experienceLevel?: string;
  availability?: string;
  location?: string;

}



const UserSchema = new Schema<IUser>({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "volunteer" },
  approved: { type: Boolean, default: false },

     bio: String,
    phone: String,
    skills: [String],
    interests: [String],
    experienceLevel: String,
    availability: String,
    location: String,

},
 { timestamps: true }
);

export default model<IUser>("User", UserSchema);
