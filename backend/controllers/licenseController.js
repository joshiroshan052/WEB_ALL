const cloudinary = require("cloudinary");
const License = require("../model/licenseModel");

const createLicense = async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  const { licenseName } = req.body;
  const { licenseImageUrl } = req.files;

  if (!licenseName) {
    return res.json({
      success: false,
      message: "Please enter your license number.",
    });
  }
  try {
    const uploadedImage = await cloudinary.v2.uploader.upload(
      licenseImageUrl.path,
      {
        folder: "license",
        crop: "scale",
      }
    );

    const newlicense = new License({
      licenseName: licenseName,
      licenseImageUrl: uploadedImage.secure_url,
    });
    await newlicense.save();
    res.json({
      success: true,
      message: "License added successfully",
      license: newlicense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};
//get all license
const getLicense = async (req, res) => {
  try {
    const allLicense = await License.find({}); //curly bracket error aaucha vanera (khali narakhna)
    res.json({
      success: true,
      message: "All license fetched successfully!",
      license: allLicense,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
};

//fetch single product
const getSingleLicense = async (req, res) => {
  const licenseId = req.params.id;
  try {
    const singleLicense = await License.findById(licenseId);
    res.json({
      success: true,
      message: "Single product fetched successfully!",
      product: singleLicense,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
};

//update product
const updateLicense = async (req, res) => {
  //step 1 : check incoming data
  console.log(req.body);
  console.log(req.files);
  //Step 2: Destructuring data(Json,file)
  const { licenseName, } =
    req.body;
  const { licenseImage } = req.files;
  //step 3: Validate data(Done valid image)
  if (
    !licenseName
  ){
    return res.json({
      success: false,
      message: "License Number is missing.!",
    });
  }
  //step 4: try catch block
  try {
    //if there is image
    if (licenseImage) {
      const uploadedImage = await cloudinary.v2.uploader.upload(
        productImage.path,
        {
          folder: "license",
          crop: "scale",
        }
      );

      //make updated json data
      const updatedData = {
        licenseName: licenseName,
        licenseImageUrl: uploadedImage.secure_url,
      };
      //find product and update
      const licenseId = req.params.id;
      await License.findByIdAndUpdate(licenseId, updatedData);
      res.status(200).json({
        success: true,
        message: "License updated successfully with Image!",
        updateLicense: updatedData,
      });
    } else {
      const updatedData = {
        licenseName: licenseName,
      };
      //find product and update
      const licenseId = req.params.id;
      await License.findByIdAndUpdate(licenseId, updatedData);
      res.json({
        success: true,
        message: "License updated successfully without Image!",
        updateLicense: updatedData,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

//delete product
const deleteLicense = async (req, res) => {
  const licenseId = req.params.id;
  try {
    await License.findByIdAndDelete(licenseId);
    res.json({
      success: true,
      message: "License deleted successfully!",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server Error!",
    });
  }
};

module.exports = {
  createLicense,
  getLicense,
  getSingleLicense,
  updateLicense,
  deleteLicense,
};
