import { getBusInfo, addBusInfo } from "../db/busDB.js";

export const retrieveBus = async(req, res)=>{
    console.log(req?.query);
    res.send(await getBusInfo(req?.query));
}

export const addBus  = async(req, res)=>{
   res.send(await addBusInfo(req.body));
}