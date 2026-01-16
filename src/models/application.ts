import { Schema, model, Document, Types } from "mongoose";

export type ApplicationStatus =
  | "pending"
  | "approved"
  | "rejected";

export interface IApplication extends Document {
  volunteer: Types.ObjectId;
  project: Types.ObjectId;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    volunteer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default model<IApplication>("Application", ApplicationSchema);
