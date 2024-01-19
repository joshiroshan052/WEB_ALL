import React, { useState } from "react";
import { registerApi } from "../apis/Api";
import { toast } from "react-toastify";
import "./login.css";
import Slider from "../pages/Slider";
import { Link, useNavigate } from "react-router-dom";
import Icon1 from "../assets/images/iconn.png";


const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const changeLastName = (e) => {
    setLastName(e.target.value);
  };
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePhoneNo = (e) => {
    setPhoneNo(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(firstName, lastName, email, phoneNo, password);

    const data = {
      firstName: firstName,
      lastName: lastName,
      email : email,
      phoneNo: phoneNo,
      password: password,
    };
    registerApi(data)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          navigate("/login")
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error frontend");
      })

  }

  return (
    <div className="background-img d-flex justify-content-center">
      
      <div className="bodys d-lg-flex d-md-flex d-sm-block mt-4 ">
        <div className="left-container p-4">
          <div className="change-image">
            <Slider />
          </div>
        </div>
        <div className="right-container  ">
          <div className="d-flex justify-content-center mt-5"> <h2 className="pt-2 pb-2 text-center w-50 rounded-pill shadow-lg p-3 mb-5 bg-body rounded">Sign Up</h2></div> 
          <div className="d-flex justify-content-center">
          <img src={Icon1} alt="iconImg" height="120" width="130" /></div> 
       
          <form onSubmit={handleSubmit}>
          <div className="login">
            <div className="login-form">
              <div className=" col-12 ">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-10 mt-3">
                    <input onChange={changeFirstName}
                      className="login-input form-control border-success"
                      type="name"
                      name="name"
                      placeholder="Name"
                      required=""
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 mt-3"><input
                    onChange={changeLastName}
                    className="login-input form-control border-success"
                    type="name"
                    name="name"
                    placeholder="Last Name"
                    required=""
                  /></div>
                  <div onChange= {changeEmail}className='pass'>
                <input
                  className="login-input form-control border-success mt-3"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>

                </div>
              </div>
              <input onChange={changePhoneNo}
                className="login-input form-control border-success mt-3"
                type="number"
                name="phone_number"
                placeholder="Phone Number"
                required=""
              />
              <div onChange= {changePassword}className='pass'>
                <input
                  className="login-input form-control border-success mt-3"
                  name="pswd"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <hr className="solid" />
              <button className="login-btn bg-dark">Sign Up</button>
              <h3 className="pt-4">
                Already have account?{" "}
                <span className="signup">
                  {" "}
                  <Link to="/login">Login</Link>
                </span>
              </h3>
            </div>
          </div>
          </form>
        </div>
      </div>
   
    </div>
    
  );
};

export default Register;
