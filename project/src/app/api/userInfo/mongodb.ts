import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI as string;

if(!MONGODB_URI){
    throw new Error("MONGODB_URI is not in .env.local");
}

let cached = (global as any).mongoose;

if(!cached){
    cached = (global as any).mongoose = {conn : null, promise : null};
}

export default async function connectDB() {
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI);
    }

    cached.conn = cached.promise;
    return cached.conn;
}