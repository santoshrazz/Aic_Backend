import { Router } from "express";
import {
  addNotificaion,
  getAllNotification,
} from "../Controller/notification.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const notificationRouter = Router();

notificationRouter.route("/add").post(verifyJWT, addNotificaion);
notificationRouter.route("/getNotification").get(getAllNotification);
export default notificationRouter;
