import React, { useState } from 'react';
import { RiNeteaseCloudMusicLine } from "react-icons/ri";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { Backend_url } from '../utils/Config';
import axios from 'axios';
import { useAuth } from '../Context/AuthProvider';

const Login = () => {
  const [formValue, setFormValue] = useState({ emailIdOrUserName: '', password: '' })
  const [showPassword, setShowPassword] = useState(false);
  const [auth,setAuth]= useAuth()

  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormValue({ ...formValue, [name]: value })
  }


  const handleLogin = async() =>{
    const {data} = await axios.post(`${Backend_url}/api/user/login`,
      formValue
    )
      if (!data.success) {
          if(data.cause === 'user'){
              const myElement = document.getElementById("userspan");
              myElement.style.color = "red";
              myElement.innerHTML = data.message;

            setTimeout(() => {  
              myElement.innerHTML = "";
            }, 2000);
          }
          else{
            const myElement = document.getElementById("passwordspan");
            myElement.style.color = "red";
            myElement.innerHTML = data.message;
            

            setTimeout(() => {
              myElement.innerHTML = "";
            }, 2000);

          }
      }

      if(data.success)
      {


        setAuth({...auth,
          user:data.user,
          token:data.token})

        localStorage.setItem('auth',JSON.stringify(data))
        navigate('/')
      }

  }


  return (
    <div style={{ backgroundColor: '#17252A' }}>
      <div style={{ padding: '30px' }}>
        <span className='title'><RiNeteaseCloudMusicLine /> Music</span>
      </div>

      <div className='container-md' style={{ backgroundColor: '#1F2833', marginBottom: '40px', marginTop: '20px' }}>
        <h1 className='heading'>Log in into music</h1>

        <div className="row align-items-center label" style={{ justifyContent: 'center', color: '#FEFFFF' }}>
          <div className="col-sm-4">
            <label htmlFor="inputEmailOrUserName" className="col-form-label">Email or username</label>
          </div>
        </div>
        <div className="row align-items-center" style={{ justifyContent: 'center' }}>
          <div className="col-sm-4">
            <input
              type="text"
              id="inputEmailOrUserName"
              name='emailIdOrUserName'
              value={formValue.emailIdOrUserName}
              className="form-control"
              placeholder='Email or username'
              onChange={handleOnChange}
            />
          <span id='userspan'></span>
          </div>

        </div>

        <div className="row align-items-center" style={{ justifyContent: 'center', color: '#FEFFFF' }}>
          <div className="col-sm-4">
            <label htmlFor="inputPassword" className="col-form-label">Password</label>
          </div>
        </div>
        <div className="row align-items-center" style={{ justifyContent: 'center' }}>
          <div className="col-sm-4" style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="inputPassword"
              className="form-control"
              placeholder='password'
              name='password'
              value={formValue.password}
              onChange={handleOnChange}
              style={{ paddingRight: '40px' }} // Adjusting the input padding to accommodate the eye icon
            />
            <span className="password-toggle" onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '20px', top: '45%', transform: 'translateY(-50%)' }}>
              {!showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            <div>

            <span style={{textAlign: 'center'}} id="passwordspan" className="form-text"></span>
            </div>
          </div>
        </div>

        <div className="row align-items-center" style={{ justifyContent: 'center' }}>
          <button className="col-sm-4 loginbutton" onClick={handleLogin}>Log in</button>
        </div>

        {/* <div style={{ textAlign: 'center', margin: '20px' }}>
          <Link to='/forgotpassword' className='loginpagelink'>Forgot your password?</Link>
        </div> */}

        <h5 style={{ color: '#FEFFFF', textAlign: 'center', paddingBottom: '100px', paddingTop: '100px' }}>
          Don't have an account? <Link to='/signup' className='loginpagelink'>Sign up for Music</Link>
        </h5>
      </div>

      <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#17252A', color: '#FEFFFF' }}>
        <h6>This site is protected by reCAPTCHA and the Google <Link to='/n' style={{ color: '#FEFFFF' }}>Privacy Policy </Link> and <Link to='/n' style={{ color: '#FEFFFF' }}>Terms of Service</Link> apply.</h6>
      </div>
    </div>
  );
};

export default Login;