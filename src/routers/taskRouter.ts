import express from "express";
import { taskCtrl } from "../controllers/taskController";

export const taskRouter = express.Router();

taskRouter.route("/").post(taskCtrl.create).get(taskCtrl.getAll);
taskRouter
  .route("/:id")
  .get(taskCtrl.getById)
  .delete(taskCtrl.deleteById)
  .put(taskCtrl.updateOne);
