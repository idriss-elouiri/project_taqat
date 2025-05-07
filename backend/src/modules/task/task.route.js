import express from "express";
import * as taskController from "./task.controller.js";
import { verifyToken } from "../../utils/verifyUser.js";

const router = express.Router();

// مهام موقع معين
router
  .route("/:siteId/tasks")
  .post(verifyToken, taskController.createTask)
  .get(verifyToken, taskController.getSiteTasks);

// مهمة مفردة
router
  .route("/:siteId/tasks/:taskId")
  .get(verifyToken, taskController.getTask)
  .put(verifyToken, taskController.updateTask)
  .delete(verifyToken, taskController.deleteTask);

// تبديل حالة الإكمال للمهمة
router
  .route("/:siteId/tasks/:taskId/toggle")
  .put(verifyToken, taskController.toggleTaskCompletion);

export default router;
