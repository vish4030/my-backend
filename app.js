import express from 'express';
import cors from 'cors';

import busRouter from "./routes/bus.js";
import userRouter from "./routes/user.js";

export const app = express();

app.get('/',(req,res)=>res.send("localhost is working"));
app.use(cors());
app.use(express.json())
app.use(busRouter);
app.use(userRouter);

app.listen(process.env.PORT,()=>{console.log(`server working at port ${process.env.PORT}`)})

