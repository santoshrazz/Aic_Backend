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
    console.log("req.files is ", req.files);
    if (!req.files.frenchiseAvatar[0]) {
      console.log("inside if");
      return res
        .status(400)
        .json({ status: false, message: "Frenchise Pic Required" });
    }
    const frenchiseAvatar = req.files?.frenchiseAvatar[0]?.path;
    console.log(frenchiseAvatar);
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
