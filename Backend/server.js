import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import leadRouter from "./routes/leadRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cookieParser from "cookie-parser";





const app = express()
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true                
}));

//db connection
connectDB();

// api endpoints
app.use("/api/lead",leadRouter);
app.use("/api/user",userRouter);
app.get("/", (req, rest) => {
  rest.send("API Working");
});




app.get("/",(req,rest)=>{
    rest.send("API Working")
})

app.listen(port,()=>{
    console.log (`Server running on port ${port}`);
})

