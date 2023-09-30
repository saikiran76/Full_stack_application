import dotenv from "dotenv";

dotenv.config()

const config = {
    JWT_SECRET: procces.env.JWT_SECRET, 
    JWT_EXPIRY: process.env.JWT_EXPIRY || "30d",

}

export default config;
