import mongoose, { Document, Schema } from "mongoose";
import { timeStamp } from "node:console";

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  instagram: string;
  github: string;
  linkedin:string
  bio: string;
}

const schema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    image: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    linkedin:{
      type:String,
      trim:true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", schema);

export default User;
