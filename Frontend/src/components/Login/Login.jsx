import React, { useState, useContext } from 'react'
import './Login.css'
import {assets} from '../../assets/assets'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config/config'
import { useNavigate } from 'react-router-dom';

const Login = ({setShowLogin}) => {

  const navigate = useNavigate();
    const [currState, setCurrState] = useState("Login")


    const[data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (event) => {
      const name= event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}));
    }

  const onlogin = async (event) => {
    
    event.preventDefault();
    let newUrl = API_URL;
    if (currState === "Login") {
      newUrl += '/api/user/login';
    }
    else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data, { withCredentials: true });
      console.log("Response data:", response.data); 
      console.log("Success value:", response.data.success, typeof response.data.success);


    if (response.data && response.data.success === true) {
        if (typeof setShowLogin === "function") {
        setShowLogin();
    }
      navigate('/');
    } else {
        alert(response.data.message || "Login/Register failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }
  }
  return (

    <div className='login-popup'>
      <form onSubmit={onlogin} className='login-popup-container'>
        <div className="login-popup-title">

            <h2>{currState}</h2>
           <Link to='/'onClick={()=> setShowLogin()}><img  src={assets.cross_icon} alt="" /></Link> 
        </div>
        <div className="login-popup-inputs">
            {currState==="Login"?<></>:<input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />} 
            <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
            <input  name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currState==="Register"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
            <input type='checkbox' required />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="Login"
        ?<p>Create a new Account? <span onClick={()=> setCurrState("Register")}>Click Here</span></p>:
        <p>Already have an account? <span onClick={()=> setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default Login
