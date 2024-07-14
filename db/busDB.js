import mongoose from "mongoose";
const { Schema } = mongoose;
import 'dotenv/config';

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
   console.log('Connected to MongoDB');
}).catch(err => {
   console.error('Connection error', err);
});

const busSchema = new Schema({
    busNo:String,
    busName:String,
    avlSeat:Number,
    totSeat:Number,
    start:String,
    destination:String,
    busFare:Number,
    departDate:String
}, { collection: 'bus_info' })

const BusInfo = mongoose.model('BusInfo',busSchema);



export const getBusInfo = async(query)=>{
    // let start = query.start.charAt(0).toUpperCase();
    // let destination  = query.destination.charAt(0).toUpperCase();
    // console.log("Start: ",start, "\ndestination: ",destination);
    try{
        let response = await BusInfo.find({
            start: { $regex: new RegExp(`^${query.start}$`, 'i') },
            destination: { $regex: new RegExp(`^${query.destination}$`, 'i') }
        })
        let busInfo = response.map((item) => {
           const{busNo, busName, avlSeat, totSeat, start, destination, busFare, departDate} =item;
           return {busNo, busName, avlSeat, totSeat, start, destination, busFare, departDate}; 
            
        });
        busInfo.unshift(query)
        return busInfo;
    }catch(err){
        return [];
    }
}

export const addBusInfo = async(busInfo)=>{
    const newBus = new BusInfo(busInfo);
    try{
        await newBus.save();
        return "Bus information saved...";
    }catch(err){
        return({err, msg:"Something went wrong( Duplicate Depart Date )."});
    } 
}