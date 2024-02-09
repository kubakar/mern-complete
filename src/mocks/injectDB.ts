import dotenv from "dotenv";
import { readFile } from "fs/promises";
import Job from "../models/Job.js";
import connectDB from "../dbConnect.js";

dotenv.config({ path: "../../.env" }); // need to add path in nested folder
console.clear();

try {
  console.log("port", process.env.PORT); // process.env check

  await connectDB();
  await Job.deleteMany(); // delete all

  const jsonJobs = await readFile(
    // this is how path is constructed in ES modules
    // https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
    new URL("./mock-data.json", import.meta.url) // by default TS will read 'dist' directory
  );

  const jobs = JSON.parse(jsonJobs.toString());

  await Job.create(jobs); // array can be passed
  console.log("DONE");

  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
