const enquiryModel = require("../../models/enquiry.model");

let enquiryInsert = (req, res) => {
  let { name, email, phone, message } = req.body;
  let enquiry = new enquiryModel({ name, email, phone, message });

  enquiry
    .save()
    .then(() => {
      res.send({ status: 1, message: "Enquiry saved successfully" });
    })
    .catch((err) => {
      res.send({ status: 0, message: "Error while saving", error: err });
    });
};

let enquiryList = async (req, res) => {
  try {
    console.log("🔍 Fetching all enquiries..."); // Add this line
    let enquiry = await enquiryModel.find();
    console.log("✅ Enquiries fetched:", enquiry.length);
    res.send({ status: 1, enquiryList: enquiry });
  } catch (error) {
    console.error("❌ Error in enquiryList:", error); // Already present
    res.status(500).send({ status: 0, message: "Internal Server Error", error });
  }
};



let enquiryDelete = async (req, res) => {
  try {
    let enId = req.params.id;
    let enquiry = await enquiryModel.deleteOne({ _id: enId });
    res.send({ status: 1, message: "Enquiry deleted successfully", enquiry });
  } catch (err) {
    console.error("Error in enquiryDelete:", err);
    res.status(500).send({ status: 0, message: "Internal Server Error", error: err.message });
  }
};

let enquirySingleRow = async (req, res) => {
  try {
    let enId = req.params.id;
    let enquiry = await enquiryModel.findOne({ _id: enId });
    res.send({ status: 1, enquiry });
  } catch (err) {
    console.error("Error in enquirySingleRow:", err);
    res.status(500).send({ status: 0, message: "Internal Server Error", error: err.message });
  }
};

let enquiryUpdate = async (req, res) => {
  try {
    let enquiryId = req.params.id;
    let { name, email, phone, message } = req.body;
    let updateObj = { name, email, phone, message };
    let updateRes = await enquiryModel.updateOne({ _id: enquiryId }, updateObj);
    res.send({ status: 1, message: "Enquiry updated successfully", updateRes });
  } catch (err) {
    console.error("Error in enquiryUpdate:", err);
    res.status(500).send({ status: 0, message: "Internal Server Error", error: err.message });
  }
};

module.exports = {
  enquiryInsert,
  enquiryList,
  enquirySingleRow,
  enquiryDelete,
  enquiryUpdate,
};
