import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { createLicenseApi, getAllLicenseApi } from "../apis/Api";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Dashboard.css"; // Import the CSS file

export const Dashboard = () => {
  const [licenseName, setLicenseName] = useState("");
  const [licenseImage, setLicenseImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(true); // Added state to track edit mode
  const navigate = useNavigate(); // Initialize useNavigate

  const handleImage = (event) => {
    const file = event.target.files[0];
    setLicenseImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const [license, setLicense] = useState([]);
  useEffect(() => {
    getAllLicenseApi().then((res) => {
      setLicense(res.data.license);
    });
  }, []); // Added an empty dependency array to ensure useEffect runs only once

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("licenseName", licenseName);
    formData.append("licenseImageUrl", licenseImage);

    createLicenseApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setLicenseName(""); // Clear license name after successful submission
          setLicenseImage(null); // Clear license image after successful submission
          setPreviewImage(null); // Clear preview image after successful submission
          setIsEditMode(false); // Set edit mode to false after saving
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <>
      <div className="m-4">
        <div className="text-center">
          <button onClick={handleLogout} className="btn btn-danger mb-3">
            Logout
          </button>
          {isEditMode ? (
            <>
              <h1>Dashboard</h1>
              <label className="license-number-label">License Number</label>
              <input
                type="text"
                className="license-number-box"
                value={licenseName}
                onChange={(e) => setLicenseName(e.target.value)}
              />
              <div className="license-image-container">
                {previewImage && (
                  <img
                    src={previewImage}
                    className="license-image"
                    alt="Preview"
                  />
                )}
                <label htmlFor="licenseImage" className="upload-label">
                  {previewImage ? "Change Image" : "Upload Image"}
                </label>
                <input
                  id="licenseImage"
                  onChange={handleImage}
                  type="file"
                  className="upload-input"
                />
              </div>
              <button
                onClick={handleSubmit}
                type="button"
                className="btn btn-primary"
              >
                Save License
              </button>
            </>
          ) : (
            <>
              <h1>Saved License</h1>
              <div className="saved-license-container">
                <p className="license-number">{licenseName}</p>
                {previewImage && (
                  <img
                    src={previewImage}
                    className="license-image"
                    alt="Saved License"
                  />
                )}
              </div>
            </>
          )}
        </div>
        {license.length > 0 && (
          <table className="table mt-4">
            <thead className="table-dark">
              <tr>
                <th scope="col">License Name</th>
                <th scope="col">License Image</th>
              </tr>
            </thead>
            <tbody>
              {license.map((item) => (
                <tr key={item._id}>
                  <td>{item.licenseName}</td>
                  <td className="text-center">
                    <img
                      src={item.licenseImageUrl}
                      height={150}
                      width={120}
                      alt={item.licenseName}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};