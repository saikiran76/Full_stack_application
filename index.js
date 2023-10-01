import mongoose from "mongoose";
import app from "./app";
import { config } from "./config/index";

// Create a method
// run a method
(async() => {
    try{
        await mongoose.connect(config.MONGODB_URL)
        console.log("DB connected");

        app.on('error', (err)=>{
            console.log("ERROR", err);
            throw err;
        })

        const onListening = () =>{
            console.log(`Listening on ${config.PORT}`);
        }

        app.listen(config.PORT, ()=>{
            console.log("Successfully running on port 4000")
        })

    }catch(err){
        console.log("ERROR", err);
        throw err
    }
})()
