import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './components/Login/Login'
import { Navigate } from "react-router-dom";
import Home from './Pages/Home/Home';
import Lead_list from './components/Lead_list/Lead_list';
import CreateLead from './components/createLead/createLead';
import EditLead from './components/EditLead/EditLead';





function App() {

    const [showLogin, setShowLogin] = useState(false);
      const navigate = useNavigate();

  // Handler passed to Login popup
  const handleCloseLogin = () => {
    setShowLogin(false); // close popup
    navigate('/');       // navigate to home page
  };


  return (
    <>
    {showLogin?<Login setShowLogin={handleCloseLogin} />:<></>}

    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />}/>
        <Route path='/Lead_list' element={<Lead_list />} />
        <Route path='/CreateLead' element={<CreateLead />} />
        <Route path="/leads/:id/edit" element={<EditLead />} />
      </Routes>
    </div>
    </>
  )
}

export default App
