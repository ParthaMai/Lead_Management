import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import { Navigate } from "react-router-dom";
import Home from './Pages/Home/Home';
import Lead_list from './components/Lead_list/Lead_list';





function App() {

    const [showLogin, setShowLogin] = useState(false);

  return (
    <>
    {showLogin?<Login setShowLogin={setShowLogin} />:<></>}

    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />}/>
        <Route path='/Lead_list' element={<Lead_list />} />
      </Routes>
    </div>
    </>
  )
}

export default App
