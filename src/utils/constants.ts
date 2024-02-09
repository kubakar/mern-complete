import { Types } from "mongoose";

export enum JobStatus {
  Interview = "interview",
  Declined = "declined",
  Pending = "pending",
}

export enum JobType {
  Full = "full-time",
  Part = "part-time",
  Remote = "remote",
  Internship = "internship",
}

// Jobs sort by ?

// Document interface
export interface JobInterface {
  company: string;
  position: string;
  status: JobStatus;
  type: JobType;
  location: string;
  createdBy: Types.ObjectId; // optional since not needed in client's 'JobForm'
  // client only part
  // _id?: string; // not true (This is ObjectId from mongo!)
  _id?: Types.ObjectId; // not true (This is ObjectId from mongo!)
  createdAt?: string;
}

// CLIENT
export type User = {
  user: {
    location: string;
    name: string;
    lastName: string;
    email: string;
    _id: string;
    role: string;
  };
};
