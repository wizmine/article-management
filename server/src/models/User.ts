import mongoose, { Types } from "mongoose";

export interface IUser {
  login: string;
  email: string;
  passwordHash: string;
  isAdmin: boolean;
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    login: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);
