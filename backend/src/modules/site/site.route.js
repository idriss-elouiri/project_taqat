import express from "express";
import * as siteController from "./site.controller.js";
import { verifyToken } from "../../utils/verifyUser.js";

const router = express.Router();

// المواقع الرئيسية
router
    .route("/")
    .post(verifyToken, siteController.createSite)
    .get(verifyToken, siteController.getSites);

// موقع معين
router
    .route("/:siteId")
    .get(verifyToken, siteController.getSite)
    .put(verifyToken, siteController.updateSite)
    .delete(verifyToken, siteController.deleteSite);

// إضافة موقع فرعي
router
    .route("/:siteId/subsites")
    .post(verifyToken, siteController.addSubsite);

// إضافة موظف لموقع فرعي
router
    .route("/:siteId/subsites/:subsiteId/employees")
    .post(verifyToken, siteController.addEmployee);

// إضافة مهمة لموظف
router
    .route("/:siteId/subsites/:subsiteId/employees/:employeeId/tasks")
    .post(verifyToken, siteController.addEmployeeTask);

// إضافة موعد نهائي
router
    .route("/:siteId/subsites/:subsiteId/deadlines")
    .post(verifyToken, siteController.addDeadline);

export default router;
