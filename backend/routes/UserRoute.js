import express from "express";
import {
  getUser,
  login,
  logout,
  myProfile,
  contact,
  updateUser,
  addTimeline,
  addProject,
  addYoututbe,
  deleteTimeline,
  deleteProject,
  deleteYoutube,
} from "../controller/UserController.js";
import { isAuthenticated } from "../middleware/auth.js";
export const userRouter = express.Router();
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/user").get(getUser);
userRouter.route("/contact").post(contact);

userRouter.route("/me").get(isAuthenticated, myProfile);
userRouter.route("/admin/update").put(isAuthenticated, updateUser);

userRouter.route("/admin/timeline/add").post(isAuthenticated, addTimeline);
userRouter.route("/admin/project/add").post(isAuthenticated, addProject);
userRouter.route("/admin/youtube/add").post(isAuthenticated, addYoututbe);

userRouter.route("/admin/timeline/:id").delete(isAuthenticated, deleteTimeline);
userRouter.route("/admin/project/:id").delete(isAuthenticated, deleteProject);
userRouter.route("/admin/youtube/:id").delete(isAuthenticated, deleteYoutube);
