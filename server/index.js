const http=require('http');
const express=require('express');
const cors=require('cors');
const socketIO=require('socket.io');
const port=3300 || process.env.PORT;

const users=[{}];
const app=express();
const server=http.createServer(app);
const io =socketIO(server);


app.use(cors());
app.get("/",(req,res)=>{
    res.send("It's Work");
})
app.get("*",(req,res)=>{
    res.send("404:Page not found");
    
})

  


io.on("connection",(socket)=>{
    console.log("New connection");

    socket.on("joined",({user})=>{
        users[socket.id]=user;
        console.log(`${user} joined`);
        socket.emit('welcome',{user:"Admin",message:`welcome to the chat ${users[socket.id]}`});
        socket.broadcast.emit('userjoined',{user:users[socket.id],message:`<b>${users[socket.id]}</b> has <b>joined</b> this ADDA`});
    }) 
    socket.on('disconnect',()=>{
       
        console.log(socket.connected);
        socket.broadcast.emit('leave',{user:users[socket.id],message:`<b>${users[socket.id]}</b> has <b>left</b> this ADDA`})
        console.log("user left");
        
    })
    socket.on('message',(message,id)=>{
        // io.emit('sendMessage',{user:users[socket.id],message,id});
        
        socket.broadcast.emit('sendMessage',{user:users[socket.id],message,id})
    })
})



server.listen(port,()=>{
 console.log(`Server on port http://localhost:${port}/`);
}) 
