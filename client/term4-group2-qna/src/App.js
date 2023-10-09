import './App.css';
import './css/colors.css'
import './css/components.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Home } from './components/screens/home';
import { QuestionPage } from './components/screens/questionPage';
import { UserAccount } from './components/screens/userAccount';
import { Boarding } from './components/screens/boarding';
import PrivateRoute from './components/util/privateRoute';
import { NavBar } from './components/elements/Navbar/navBar';
// require('dotenv/config')



function App() {
  const isLoggedIn = sessionStorage.getItem("loggedIn")
  useEffect(() => {
    if (!isLoggedIn || isLoggedIn === "") {
      sessionStorage.setItem("loggedIn", false)
    }
  })
  return (
    <div className="App">
      <NavBar />
      {/* <NavLink to={`/user/1`}>user  </NavLink>
      |
      <NavLink to={`/questions`}>  create questions</NavLink> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/questions' element={<PrivateRoute><QuestionPage /></PrivateRoute>} />
        <Route path='/user/:id' element={<PrivateRoute><UserAccount /></PrivateRoute>} />
        <Route path='/boarding' element={<Boarding />} />
      </Routes>
    </div>
  );
}

export default App;
