import { Schema, model } from "mongoose";
import { JobInterface, JobStatus, JobType } from "../utils/constants.js";

// Schema
const schema = new Schema<JobInterface>(
  {
    company: {
      type: String,
      required: [true, "Please provide company"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      // https://stackoverflow.com/questions/55377365/what-does-keyof-typeof-mean-in-typescript
      // enums are used as types at compile-time to achieve type-safety for the constants but they are treated as objects at runtime
      enum: Object.values(JobStatus),
      default: JobStatus.Pending,
    },
    type: {
      type: String,
      enum: Object.values(JobType),
      default: JobType.Full,
    },
    location: {
      type: String,
      default: "My city",
      required: true,
    },
    createdBy: {
      // https://mongoosejs.com/docs/typescript.html
      type: Schema.Types.ObjectId,
      ref: "User", // relation to 'User' DB
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true } // automatically add time realted fields
);

export default model("Job", schema); // 'UserModel' is passed to have methods in the instance
// export default model<JobInterface>("Job", schema);
