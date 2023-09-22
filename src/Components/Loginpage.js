import {useRef,React, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Images/ADDA app logo.png';

let user;
function Loginpage() {
  const [nam, setNam] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const handleClick=()=>{
    if(nam.length < 15){
      user=inputRef.current.value;
      // document.getElementById('userInput').value = ""; 
    }
  }
  const handleChange=()=>{

      setNam(inputRef.current.value); 
}
const handlekeydown=(event)=>{
  if(event.key === 'Enter' && inputRef.current.value !=="" && nam.length<15){
    user=inputRef.current.value;
    navigate('/home');
  }
}

  return (
    <> 
   <div className="login">
    <img src={logo} alt="APP Logo" className='applogo' />
    <input type="text" className='inpbox' ref={inputRef} onChange={handleChange}  placeholder='Enter Your User Name (<15)' id='userInput' onKeyDown={handlekeydown}  />
   <div className="inpbtn"><Link to="/home" style={{ textDecoration: 'none' }} ><button className="btn" disabled={nam.length ===0?true:false}  onClick={handleClick} >JOIN</button></Link>
   
   </div>
      
   </div>
    </>
  )
}

export default Loginpage;
export {user};