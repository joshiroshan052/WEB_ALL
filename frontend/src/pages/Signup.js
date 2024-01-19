
import "./login.css";
import React from 'react';
import Second from '../assets/logo/Second.png';
import Img1 from "../assets/images/Rectangle5.png";
import Slider from "../loginView/Slider";
import Plus from "../assets/icons/basil_add-solid.png"
import { Link } from 'react-router-dom';
import Password from './passsword_signup';
import Footer from "../component/footer";

function SignUp(){
    return(
        <div>
 <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <div className="brands">
      <img src={Second} alt="second" class="px-2"/>
    <a className="navbar-brand" href="#">Second</a>
    </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="material-symbols-rounded">
menu
</span>
    </button>
   
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    
        <li className="nav-item">
        <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="search-btn" type="submit"><span class="material-symbols-rounded">
        search
</span></button>
      </form>
        </li>
        <li className="nav-item ">
        <button className="sell-btn mx-2 px-2"> <img src={Plus}/>Sell</button> 
        </li>
        <div className="vl mx-2"></div>
        <li className="nav-item ">
        <Link to="/"><button className="login-btns"> login</button></Link>
      
        </li>
        <li className="nav-item ">
        <button className="signup-btns mx-2 px-2">Sign Up</button> 
        </li>
      </ul>
    
    </div>
  </div>
</nav>
<div className="bodys d-lg-flex d-md-flex d-sm-block ">
<div className="left-container p-5">
<img src={Img1} alt="front image"/>
</div>
<div className="right-container  ">
<div className="change-image">
<Slider/>
</div>
<h2 className="pt-2 pb-2">
Sign Up
</h2>
<div className="login">
				<div className="login-form">
                <input className="login-input" type="name" name="name" placeholder="Name" required=""/>
					<input className="login-input" type="email" name="email" placeholder="Email" required=""/>
                    <input className="login-input" type="number" name="phone_number" placeholder="Phone Number" required=""/>
                    <Password/>
          <hr className="solid"/>
					<button className="login-btn bg-dark">Sign Up</button>
                      <h3 className="pt-4">Already have account? <span className="signup"> <Link to="/">Sign in</Link></span></h3>
        
				</div>
			</div>
</div>
</div>
<Footer/>
        </div>
    );
}
export default SignUp