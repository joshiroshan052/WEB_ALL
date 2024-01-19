import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../apis/Api';
import { toast } from 'react-toastify';

const VerificationMessage = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const verifyMail = async () => {
      try {
        const response = await verifyEmail(); // Assuming verifyEmail returns a promise

        if (response.data.success) {
          setMessage('Email has been verified. Redirecting to login page.');
          toast.success('Email has been verified.');
          navigate('/login'); // Use navigate instead of history.push
        } else {
          setMessage('Email verification failed. Please try again.');
          toast.error('Email verification failed.');
        }
      } catch (error) {
        console.error('Error verifying email:', error.message);
        setMessage('Internal Server Error. Please try again later.');
        toast.error('Internal Server Error.');
      }
    };

    verifyMail();
  }, [navigate]); // Add 'navigate' to the dependency array

  return (
    <div className="verification-message">
      <h2>{message}</h2>
      <Link to="/login">Go back to Login</Link>
    </div>
  );
};

export default VerificationMessage;
