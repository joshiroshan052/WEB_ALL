import React, { useState } from 'react';
import { forgotPasswordApi } from '../apis/Api';
import { toast } from 'react-toastify';
import "./ForgotPassword.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';



const ForgetPassword = () => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const handleForgotPasswordEmail = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: forgotPasswordEmail,
    };

    forgotPasswordApi(data)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          // You can redirect the user to another page if needed
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Internal server error');
      });
  };

  return (
    <div className="background-img2 d-flex justify-content-center">
      <div className="cardf">
        <p className="lock-icon"><FontAwesomeIcon icon={faLock} /></p>
        <h2 className='fh2'>Forgot Password?</h2>
        <p className='fp'>You can reset your password here</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="fpassInput"
            placeholder="Email address"
            value={forgotPasswordEmail}
            onChange={handleForgotPasswordEmail}
          />
          <button className="fbutton" type="submit">Send Confirmation Mail.</button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
