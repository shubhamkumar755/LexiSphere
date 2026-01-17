import express from "express";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// for deployment
import path from "path";

const app=express();
const PORT=process.env.PORT;

// for deployment
const __dirname=path.resolve();

// // NOOB way
// app.get("/api/auth/signup",(req,res)=>{
//     res.send("Signup Route");
// });

// app.get("/api/auth/login",(req,res)=>{
//     res.send("Login Route");
// });

// app.get("/api/auth/logout",(req,res)=>{
//     res.send("Logoot Route");
// });

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true // allow to frontend to send the cookies
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/chat",chatRoutes);

// for deployment
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*", (req,res)=>{
        res.send(path.join(__dirname,"../frontend/dist/index.html"));
    })
}

app.listen(PORT,()=>{
    console.log(`server is runnig on port ${PORT}`);
    connectDB();
});