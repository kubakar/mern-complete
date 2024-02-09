import { Router } from "express";

import {
  getAllJobs,
  createJob,
  deleteJob,
  updateJob,
  getSingleJob,
  showStats,
} from "../controllers/jobController.js";
import { validateIdParam, validateJobsForm } from "../middleware/validation.js";
import { authJobResource } from "../middleware/auth.js";

const router = Router();

router
  .route("/")
  .post(...validateJobsForm, createJob)
  .get(getAllJobs);

// has to be placed before :id !
router.get("/stats", showStats);

// :param based declared at the end of declaration
router
  .route("/:id")
  .all(...validateIdParam, authJobResource) // pass one time only to all methods
  .get(getSingleJob)
  .delete(deleteJob)
  .patch(...validateJobsForm, updateJob);
export default router;
