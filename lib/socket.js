import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
    }
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

//used to store online users
const userSocketMap = {};                //key: userId, value: socketId    For example:{userId: socketId} 

io.on("connection", (socket) => {                    //when a user is connected
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;    //get userId from the query parameter
    if (userId) userSocketMap[userId] = socket.id;     //store the userId and socketId in the map

    //io.emit() is used to send events or message to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));    //send the list of online users to all connected clients

    socket.on("disconnect", () => {                   //when a user is disconnected
        console.log("A user disconnected", socket.id);
        delete userSocketMap [ userId ]; //delete the userId from the map
        io.emit("getOnlineUsers", Object.keys(userSocketMap));    //send the list of online users to all connected clients
    });
});

export { io, app, server };