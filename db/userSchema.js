import mongoose from "mongoose";
const { Schema } = mongoose;
import 'dotenv/config';

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
   console.log('Connected to MongoDB');
}).catch(err => {
   console.error('Connection error', err);
});



// Define the schema and specify the collection name
const userSchema = new Schema({
    name: String,
    email: {type:String, unique:true},
    age: String,
    address: String,
    gender: String,
    password: String,
}, { collection: 'users' });
// Define Model
const User = mongoose.model('User', userSchema);


// addUser 
export const addUser = async (data) => {
    const newUser = new User(data);
    try{
        await newUser.save();
        return "User registered";
    }catch(err){
        return "Duplicate email";
    }  
}

// login
export const login = async(data) =>{
    const userByEmail = await User.findOne({ email: data.email, password:data.password }); 
    return userByEmail;
}
