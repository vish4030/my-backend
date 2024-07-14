import express from 'express';
import cors from 'cors';

import busRouter from "./routes/bus.js";
import userRouter from "./routes/user.js";

const app = express();
app.use(cors());

app.get('/',(req,res)=>res.send("localhost is working"));

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });


app.use(express.json())
app.use(busRouter);
app.use(userRouter);

// Set port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server working at port ${PORT}`);
});


