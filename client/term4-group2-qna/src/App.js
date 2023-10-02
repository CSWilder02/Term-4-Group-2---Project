import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/screens/home';
import { QuestionPage } from './components/screens/questionPage';
import { UserAccount } from './components/screens/userAccount';
import { Boarding } from './components/screens/boarding';
import PrivateRoute from './components/util/privateRoute';
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
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/question/:id' element={<PrivateRoute></PrivateRoute>} />
        <Route path='/user/:id' element={<PrivateRoute><UserAccount /></PrivateRoute>} />
        <Route path='/boarding' element={<Boarding />} />
      </Routes>
    </div>
  );
}

export default App;
