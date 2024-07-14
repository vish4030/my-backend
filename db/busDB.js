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

const busSchema = new Schema({
    busNo: { type: String, required: true },
    busName: { type: String, required: true },
    avlSeat: { type: Number, required: true },
    totSeat: { type: Number, required: true },
    start: { type: String, required: true },
    destination: { type: String, required: true },
    busFare: { type: Number, required: true },
    departDate: { type: String, required: true }
}, { collection: 'bus_info' });

const BusInfo = mongoose.model('BusInfo', busSchema);

export const getBusInfo = async (query) => {
    try {
        const response = await BusInfo.find({
            start: { $regex: new RegExp(`^${query.start}$`, 'i') },
            destination: { $regex: new RegExp(`^${query.destination}$`, 'i') }
        });

        const busInfo = response.map((item) => {
            const { busNo, busName, avlSeat, totSeat, start, destination, busFare, departDate } = item;
            return { busNo, busName, avlSeat, totSeat, start, destination, busFare, departDate };
        });

        busInfo.unshift(query);
        return busInfo;
    } catch (err) {
        console.error('Error fetching bus info', err);
        return { error: 'Failed to fetch bus information', details: err.message };
    }
}

export const addBusInfo = async (busInfo) => {
    const newBus = new BusInfo(busInfo);
    try {
        await newBus.save();
        return { message: "Bus information saved successfully" };
    } catch (err) {
        if (err.code === 11000) {
            // Handle duplicate key error
            return { error: 'Duplicate key error', details: 'Bus information with the same departure date already exists' };
        } else {
            console.error('Error saving bus info', err);
            return { error: 'Failed to save bus information', details: err.message };
        }
    }
}
