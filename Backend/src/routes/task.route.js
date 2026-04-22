import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(verifyJWT);

// router
//   .route("/admin/all")
//   .get(authorizeRoles("ADMIN"), getAllTasksAdmin);


router
  .route("/")
  .post(createTask)     
  .get(getTasks);    


router
  .route("/:id")
  .get(getTaskById)     
  .put(updateTask)     
  .delete(deleteTask);  


export default router;