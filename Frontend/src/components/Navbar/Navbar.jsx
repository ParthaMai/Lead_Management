import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import axios from 'axios';  // ✅ Import axios

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
 const checkLogin = async () => {
  try {
    const res = await axios.get("https://lead-management-backend-q5vr.onrender.com/api/user/me", { withCredentials: true });
    console.log("Response from /me:", res.data); 
    if (res.data.loggedIn) {
      setLoggedIn(true);
      setUser(res.data.user);
    } else {
      setLoggedIn(false);
      setUser(null);
    }
  } catch (err) {
  console.error("Error in checkLogin:", err.response?.data || err.message);
  setLoggedIn(false);
  setUser(null);
}

};


    checkLogin();
  }, []);

  return (
    <div className='navbar'>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Hooome</Link>
        <Link to='/Lead_list' onClick={() => setMenu("Leads_List")} className={menu === "Leads_List" ? "active" : ""}>Leads List</Link>
        <Link to='/CreateLead' onClick={() => setMenu("Create_Lead")} className={menu === "Create_Lead" ? "active" : ""}>Create Lead</Link>
      </ul>

      {!loggedIn ? (
        <button onClick={() => setShowLogin(true)}>Log In</button> 
      ) : (
        <div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
