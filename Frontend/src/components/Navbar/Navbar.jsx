 import React, { useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {

 const[menu,setMenu] = useState("home");

  return (
    <div className='navbar'>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <Link to='/Lead_list' onClick={()=>setMenu("Leads_List")} className={menu==="Leads_List"?"active":""}>Leads List</Link>
        <a onClick={()=>setMenu("Create_Lead")} className={menu==="Create_Lead"?"active":""}>Create Lead</a>
      </ul>
      <Link to='/Login'><button onClick={()=>setShowLogin(true)}>Login in</button></Link> 

    </div>
    
  )
}

export default Navbar
