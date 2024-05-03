import { frenchiseModel } from "../Models/frenchise.model.js";
import uploadToCloudinery from "../Utilities/Cloudinery.utils.js";

export const addFrenchise = async (req, res) => {
  try {
    const { name, location, openingYear, ownerName } = req.body;
    if (
      name === "" ||
      location === "" ||
      openingYear === "" ||
      ownerName === ""
    ) {
      return res
        .status(400)
        .json({ status: false, message: "Incomplete information" });
    }

    // Todo : check for empty avatar
    if (!req.files.frenchiseAvatar[0]) {
      return res
        .status(400)
        .json({ status: false, message: "Frenchise Pic Required" });
    }
    const frenchiseAvatar = req.files?.frenchiseAvatar[0]?.path;
    if (!frenchiseAvatar) {
      return res
        .status(400)
        .json({ status: false, message: "Frenchise Pic Required" });
    }
    const cloudineryResponse = await uploadToCloudinery(frenchiseAvatar);
    const frenchise = await frenchiseModel.create({
      name,
      location,
      ownerName,
      openingYear,
      frenchiseAvatar: cloudineryResponse.url,
    });
    if (!frenchise) {
      res
        .status(500)
        .json({ status: false, message: "Failed to Add Frenchise" });
    }
    res
      .status(200)
      .json({ status: true, message: "Frenchise Added", frenchise });
  } catch (error) {
    console.log(`Error while creating frenchise`, error);
  }
};
export const getAllFrenchise = async (req, res) => {
  try {
    const frenchise = await frenchiseModel.find({});
    if (!frenchise) {
      return res
        .status(500)
        .json({ status: false, message: "Can't find frenchise" });
    }
    res
      .status(200)
      .json({ status: true, message: "Frenchise fetched", frenchise });
  } catch (error) {
    console.log(`Error in fetch all frenchise`, error);
  }
};
