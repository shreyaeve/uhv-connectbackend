import { Schema, model, Document, Types } from "mongoose";

export interface IFeed extends Document {
  content: string;
  author: Types.ObjectId;
  project?: Types.ObjectId;
  createdAt: Date;
}

const FeedSchema = new Schema<IFeed>(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true }
);

export default model<IFeed>("Feed", FeedSchema);
