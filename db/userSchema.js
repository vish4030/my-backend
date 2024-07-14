import mongoose from "mongoose";
const { Schema } = mongoose;
import 'dotenv/config';

const url = process.env.MONGO_URL;

mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Connection error', err);
    });

// Define the schema and specify the collection name
const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    age: String,
    address: String,
    gender: String,
    password: { type: String, required: true },
}, { collection: 'users' });

// Define Model
const User = mongoose.model('User', userSchema);

// addUser 
export const addUser = async (data) => {
    const newUser = new User(data);
    try {
        await newUser.save();
        return { message: "User registered successfully" };
    } catch (err) {
        if (err.code === 11000) {
            // Handle duplicate email error
            return { error: "Duplicate email error", details: "A user with this email already exists" };
        } else {
            console.error('Error registering user:', err);
            return { error: "Failed to register user", details: err.message };
        }
    }
}

// login
export const login = async (data) => {
    try {
        const userByEmail = await User.findOne({ email: data.email, password: data.password });
        if (userByEmail) {
            return { message: "Login successful", user: userByEmail };
        } else {
            return { error: "Invalid credentials" };
        }
    } catch (err) {
        console.error('Error during login:', err);
        return { error: "Login failed", details: err.message };
    }
}
