import axios from 'axios';
import React, { useState } from 'react';
import { RiNeteaseCloudMusicLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { Backend_url } from '../utils/Config';
import { FaEyeSlash, FaEye } from "react-icons/fa";



const SignUp = () => {

    const [formValue, setFormValue] = useState({ emailId: "", userName: "", password: "" })
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleSignup = async () => {
        const { data } = await axios.post(`${Backend_url}/api/user/register-user`,
            formValue
        )

        if (!data.success) {
            if (data.cause === 'user') {
                console.log(data.message);
                          const myElement = document.getElementById("emailspan");
                          myElement.style.color = "red";
                          myElement.innerHTML = data.message;

                        setTimeout(() => {  
                          myElement.innerHTML = "";
                        }, 2000);
            }
            else {
              

                        const myElement = document.getElementById("userspan");
                        myElement.style.color = "red";
                        myElement.innerHTML = data.message;


                        setTimeout(() => {
                          myElement.innerHTML = "";
                        }, 2000);

            }
        }

        if (data.success) {
            navigate('/login')
        }

    }


    return (
        <div style={{ backgroundColor: '#17252A' }}>

            <div style={{ backgroundColor: '#17252A', padding: '30px' }}>
                <span className='title'><RiNeteaseCloudMusicLine /> Music</span>

            </div>

            <div className='container-md' style={{ backgroundColor: '#1F2833', marginBottom: '40px', marginTop: '20px' }} >

                <h1 className='heading'>Sign up to start listening</h1>

                <div className="row align-items-center label" style={{ justifyContent: 'center', color: '#FEFFFF' }} >
                    <div className="col-sm-4" >
                        <label htmlFor="inputPassword6" className="col-form-label">Email address</label>
                    </div>
                </div>
                <div className="row align-items-center" style={{ justifyContent: 'center' }}>
                    <div className="col-sm-4">
                        <input type="text"
                            id="inputPassword6"
                            className="form-control"
                            placeholder='email or username'
                            name='emailId'
                            value={formValue.emailId}
                            onChange={handleOnChange}
                        />
                        <span id='emailspan'></span>
       

                    </div>

                </div>




                <div className="row align-items-center" style={{ justifyContent: 'center', color: '#FEFFFF' }} >
                    <div className="col-sm-4" >
                        <label htmlFor="inputPassword6" className="col-form-label">Create password</label>
                    </div>
                </div>

                <div className="row align-items-center" style={{ justifyContent: 'center' }}>
                    <div className="col-sm-4"  style={{ position: 'relative' }}>
                        <input type="password"
                            id="inputPassword6"
                            className="form-control"
                            placeholder='password'
                            name='password'
                            value={formValue.password}
                            onChange={handleOnChange}
                        />
                        <span className="password-toggle" onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '20px', top: '45%', transform: 'translateY(-50%)' }}>
                            {!showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>

                    </div>
                    <span id="passwordHelpInline" className="form-text">
                        Must be 8-20 characters long.
                    </span>
                </div>

                <div className="row align-items-center" style={{ justifyContent: 'center', color: '#FEFFFF' }} >
                    <div className="col-sm-4" >
                        <label htmlFor="inputPassword6" className="col-form-label">Create username</label>
                    </div>
                </div>

                <div className="row align-items-center" style={{ justifyContent: 'center' }}>
                    <div className="col-sm-4">

                        <input type="text"
                            id="inputPassword6"
                            className="form-control"
                            placeholder='username'
                            name='userName'
                            value={formValue.userName}
                            onChange={handleOnChange}
                        />
                        <span id='userspan'></span>

                        <span id="passwordHelpInline" className="form-text">
                            This name will appear on your profile
                        </span>
                    </div>
                </div>




                <div className="row align-items-center" style={{ justifyContent: 'center' }}>
                    <button className="col-sm-4 loginbutton" onClick={handleSignup}>Sign up</button>
                </div>



                <h5 style={{ color: '#FEFFFF', textAlign: 'center', paddingBottom: '100px', paddingTop: '100px' }}> Already have an account? <Link to='/login' className='loginpagelink'>Log in here.</Link></h5>
            </div>




            <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#17252A', color: '#FEFFFF' }}>
                <h6>This site is protected by reCAPTCHA and the Google <Link to='/n' style={{ color: '#FEFFFF' }}>Privacy Policy </Link> and <Link to='/n' style={{ color: '#FEFFFF' }}>Terms of Service</Link> apply.</h6>
            </div>
        </div>

    );
};

export default SignUp;