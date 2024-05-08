import { notificationModel } from "../Models/notification.model.js";
async function addNotificaion(req, res) {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(404)
        .json({ success: false, message: "Title and description Requires" });
    }
    const response = notificationModel.create({
      title,
      description,
    });
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Failed to Add Notification To Server",
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Notification Added" });
  } catch (error) {
    console.log(`Error while adding notification`, error);
  }
}
async function getAllNotification(req, res) {
  try {
    const response = await notificationModel.find({});
    if (!response) {
      return res.status(404).json({
        status: false,
        message: "unable to get notifications",
      });
    }
    res.status(200).json({
      status: true,
      message: "Success",
      response,
    });
  } catch (error) {
    console.log(`Error at getAllNotificaion`, error);
  }
}
export { addNotificaion, getAllNotification };
