import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { dbConnect } from './lib/db.js';
import { app, server } from './lib/socket.js';

//for deployment
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname, __filename);

dotenv.config();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Connect to MongoDB
dbConnect();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.use("*", (_, res) => {
    res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});


server.listen(PORT, () => {
    console.log('Server running on port : ' + PORT);
});