import { Router } from "express";
import {
  addNotificaion,
  getAllNotification,
} from "../Controller/notification.controller.js";
const notificationRouter = Router();

notificationRouter.route("/add").post(addNotificaion);
notificationRouter.route("/getNotification").get(getAllNotification);
export default notificationRouter;
