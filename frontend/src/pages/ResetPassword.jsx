// ResetPassword.js

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordApi } from "../apis/Api";
import { toast } from "react-toastify";
import "./ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleResetPassword = () => {
    const data = {
      password: newPassword,
    };

    resetPasswordApi(data, token)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          // Redirect to the login page after successful password reset
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Internal server error");
      });
  };

  return (
    <div className="background-img4 d-flex justify-content-center">
    <div className="cardr">
      <h2 className="lock-iconr">&#x1F512;</h2>
      <h2 className="rh2">Reset Password</h2>
      <p className="rp">Enter your new password below:</p>
      <input
        type="password"
        className="rpassInput"
        placeholder="Enter your new password"
        onChange={handleNewPassword}
      />
      <button type="button" className="rbutton" onClick={handleResetPassword}>
        Update Password
      </button>
    </div>
    </div>
  );
};

export default ResetPassword;
