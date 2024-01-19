import React, { useState } from 'react';
import "./password.css";
const PasswordInput = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className='pass'>
      <input
        className="login-input"
        type={passwordVisible ? "text" : "password"}
        name="pswd"
        placeholder="Password"
        required
      />
      <span className="material-symbols-rounded" onClick={togglePasswordVisibility}>
        {passwordVisible ?<span class="material-symbols-rounded">
visibility
</span> : <span class="material-symbols-rounded">
visibility_off
</span>}
      </span>
    </div>
  );
};

export default PasswordInput;