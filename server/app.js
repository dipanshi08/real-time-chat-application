const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const http = require("http");
const socketIo = require("socket.io");
const index = require("./routes/index");
const usersRouter = require("./routes/users");
const groupsRouter = require("./routes/groups");
const config = require("./config");
const app = express();

// =======================
// Allow CORS
// =======================

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://say-hey.herokuapp.com"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, HEAD, OPTIONS");
  next();
});

app.use(index);
app.use(cors());
app.use(express.json());
app.use('/users',usersRouter);
app.use('/groups',groupsRouter);

app.use("/test", (req, res) => {
  res.send({ response: "just testing" }).status(200);
});

// =======================
// Environment Variables
// =======================

const port = process.env.PORT || 4001;
const uri = config.mongoURI;

// ===================
// Connection to MongoDB Database
// ===================

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(()=>{
    console.log("mongodb is connected");
}).catch((error)=>{
    console.log("mongodb not connected");
    console.log(error);
});

// ===================
// SocketIO 
// ===================
  
const server = http.createServer(app);
const io = socketIo(server);
let Group = require('./models/groupModel');

var users={}

io.on("connection", (socket) => {
  console.log("New client connected");
  
  socket.on("send", (data) => {
      io.to(data.group).emit("send",data);
      Group.updateOne({ groupname: data.group }, { $push: { chathistory: data }})
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log('Error: ' + err));

  })

  socket.on("typing", (data) => {
      socket.to(data.group).emit("typing",data);
  })

  socket.on('join',(data)=>{  
    users[data.name]=socket.id;
    console.log(users)
    try{
      socket.join(data.group);
      socket.to(data.group).emit('user-joined',  data.name );
    }catch(e){
      console.log('[error]','join room :',e);
      //socket.emit('error','couldnt perform requested action');
    }
  })

  socket.on('leave',(data)=>{  
    delete users[data.name];
    try{
      socket.leave(data.group);
      socket.to(data.group).emit('user-left', data.name);
    }catch(e){
      console.log('[error]','leave room :',e);
      //socket.emit('error','couldnt perform requested action');
    }
  })

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  socket.on("get",(data)=>{
    //var resp = {
      //list : io.sockets.sockets,
      //rooms : io.sockets.adapter.rooms
    //}
    var rooms = io.sockets.adapter.rooms[data];
    var list = socket.rooms;
    var usersInRoom = []
    Object.keys(rooms['sockets']).forEach(function(room) {
      //console.log(getKeyByValue(users,room));
      usersInRoom.push(getKeyByValue(users,room));
    });
    socket.emit("get-data",{list,rooms,usersInRoom});
  })

  socket.on("disconnect", (room) => {
    console.log("Client disconnected");
  });

});
server.listen(port, () => console.log(`Listening on port ${port}`));



