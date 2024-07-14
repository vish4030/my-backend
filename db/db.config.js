import mongoose from 'mongoose';
import 'dotenv/config';


const url = process.env.MONGO_URL;


mongoose.connect(url, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(() => {
   console.log('Connected to MongoDB');
}).catch(err => {
   console.error('Connection error', err);
}); 




