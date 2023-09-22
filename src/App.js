import React from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";

import Bodypage from './Components/Bodypage';
import Loginpage from './Components/Loginpage';

function App() {


  return (
   <>
     <BrowserRouter>  
    <Routes>
    <Route path="/" element={<Loginpage />}></Route>
    <Route path="/home" element={<Bodypage />}></Route>
     </Routes>
       </BrowserRouter>
       </>
  );  
}

export default App;
