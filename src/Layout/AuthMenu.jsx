import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider';



const AuthMenu = () => {
      const navigate = useNavigate()

      const [auth,setAuth] = useAuth()
      const [profileLetter,setProfileLetter]=useState("")
        
    return (
        <div className='row Authmenu'>
      {/* <div className='col-6 d-flex justify-content-start'>
        <button className='forward-backward-button mr-2'><IoIosArrowBack /></button>
        <button className='forward-backward-button mr-auto'><IoIosArrowForward /></button>
      </div> */}
      <div className=' d-flex justify-content-end'>

        {auth.token ? 
        <div style={{display : 'flex',justifyContent : 'flex-end',alignItems : 'center'}}>
        <div className="btn-group">
  <button   data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize:'20px',fontWeight: 'bolder',marginRight:'25px', padding : '13px 18px',border : 'none',borderRadius : '30px'}}>
  Ac
  </button>
  <ul className="dropdown-menu">
    <li><Link className="dropdown-item" to='/uploadsong' style={{fontWeight:'bold',padding: '10px 15px'}}>Upload song</Link></li>
    <li><Link className="dropdown-item" to="/logout" style={{fontWeight:'bold',padding: '10px 15px'}}>Log out</Link></li>
  </ul>
</div>
</div>
:  
<div>
<button id='signup' className='mr-2' onClick={()=>{navigate('/signup')}}>Sign up</button>
<button id='login' onClick={()=>{navigate('/login')}}>Log in</button> 
</div>
}
        
        
        
      </div>
    </div>
    );
};

export default AuthMenu;


{/* <div className="row">
<div className="col-sm-4">                    
<button className='forward-backward-button'><IoIosArrowBack /></button>
</div>
<div className="col-sm-4">                    
<button className='forward-backward-button'><IoIosArrowForward /></button>
</div>
</div> */}


{/* */}

{/*   */}


    // <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    //     <li class="nav-item">
    //     <button id='signup'>Sign up</button>
          
    //     </li>
    //     <li class="nav-item">
   
    //     <button id='login'>Log in</button>
          
    //     </li>
    //    </ul> 