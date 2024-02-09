import { Router } from "express";
import {
  getAppStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUserForm } from "../middleware/validation.js";
import { adminOnly } from "../middleware/auth.js";

const router = Router();

router.get("/current-user", getCurrentUser);

router.get("/admin/stats", adminOnly, getAppStats);
router.patch("/update", ...validateUpdateUserForm, updateUser);

export default router;
