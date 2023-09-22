import {useState,useRef, useEffect,React} from 'react';
import socketIO from 'socket.io-client';
import ReactScrolltoBottom from 'react-scroll-to-bottom';
import { user } from './Loginpage';
import sendLogo from '../Images/icons8-send-100.png';
import { useNavigate } from 'react-router-dom';
import logoonly from '../Images/logoonlyadda.png';
 
const ENDPOINT='http://localhost:3300/';
let socket;

function Bodypage() {
  let name=user;
  const navigate = useNavigate();
  useEffect(() => {
    if (user === undefined) {
      navigate('/');
    } 
  }, [navigate])
  
  const [id, setid] = useState("");
    // const send=()=>{
    //   const message=document.getElementById('msg').value;
    //     socket.emit('message',{message});
    //   document.getElementById('msg').value="";
    // }
    useEffect(() => {
      socket = socketIO(ENDPOINT,{transports:['websocket']});
      
      socket.on("connect",()=>{
          console.log('connected');
          setid(socket.id);
      })
      socket.emit("joined",{user}) //sending data to server
     
       socket.on('welcome',(data)=>{
        console.log(data.user,data.message);
       })
  
       socket.on('userjoined',(data)=>{
        console.log(data.user,data.message);
        const info=document.getElementById('information');
        const notification=document.createElement("div");
        notification.innerHTML=`<br>${data.message}</br>`;
        notification.classList.add("info");
        info.appendChild(notification);
       })
       socket.on('leave',(data)=>{
         console.log(data.user);
        const info=document.getElementById('information');
        const notification=document.createElement("div");
        notification.innerHTML=`<br>${data.message}</br>`;
        notification.classList.add("info");
        notification.style.backgroundColor='red';
        info.appendChild(notification);
        
       })
       socket.on('sendMessage',(data)=>{
         console.log(data.message,data.id);
         const recv=document.getElementById('messages');
         const receiveMessages=document.createElement("div");
         receiveMessages.innerHTML=`<br> <b>${ data.user} : </b> ${JSON.stringify(data.message.message).split('"').join('')}</br>`;
         receiveMessages.classList.add("receiveMessages");
         recv.appendChild(receiveMessages);
       })
     
      return () => {
      socket.emit('disconnected');
      socket.off(); 
      }
    }, []);
   
  
    
    const boxWrapper = document.getElementById("messages");
    const inputRef = useRef(null);
  
    const handleClick=()=>{
      if(inputRef.current.value !==""){
       const message=document.getElementById('msg').value;
        socket.emit('message',{message,id});
      document.getElementById('msg').value="";
  
      //  console.log(inputRef.current.value);
       if(boxWrapper){
       const box = document.createElement("div");
       box.innerHTML = `<br> ${message}</br>`;
       box.style.backgroundColor = "rgb(255, 128, 0)";
       box.classList.add("box");
       boxWrapper.appendChild(box);
       }
      }
  
    };
  
  
    const handleKeyDown = event => {
      if (event.key === 'Enter' && inputRef.current.value !=="") {
        event.preventDefault();
  
        const message=document.getElementById('msg').value;
        socket.emit('message',{message,id});
        document.getElementById('msg').value="";
        // console.log('Pressed Enter');
        // console.log(event.target.value);
        if(boxWrapper){
          const box = document.createElement("div");
          box.innerHTML = `<br> ${message}</br>`;
          box.style.backgroundColor = "orange";
          box.classList.add("box");
          boxWrapper.appendChild(box);
          }
      }
    };

 

  return (
    <div>
        <h1 className='header'><img src={logoonly} className='bodylogo' alt="App Logo" /><div className="logoname">ADDA</div></h1>
    <div className='messageBox'>
      <ReactScrolltoBottom >
      <section className="message" id='messages' >
      <div className="box" style={{backgroundColor: 'orange'}}><b>SENDER SIDE</b></div>
      <div className="receiveMessages" style={{backgroundColor: 'rgba(57, 255, 73, 0.833)'}}><b>RECEIVERS SIDE</b></div>
      </section>
      </ReactScrolltoBottom>
      <div className="searchBox">
        <input className='search' id='msg' ref={inputRef} type="text" placeholder='Enter Your Message ' onKeyDown={handleKeyDown}/>
      </div>
        <button className='button' onClick={handleClick}><img src={sendLogo} alt="" /></button>
    </div>
    <ReactScrolltoBottom className='detail'>
     <div className="userInfo">
      <div className="user">Welcome To ADDA : <b>{name}</b></div>
      </div> 
    <div className='infom' id='information' ></div>
    </ReactScrolltoBottom>
      
    </div>
  )
}

export default Bodypage
