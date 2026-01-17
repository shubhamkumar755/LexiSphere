import {StreamChat} from "stream-chat";
import "dotenv/config"

const apiKey=process.env.STREAM_API_KEY;
const apiSecret=process.env.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.error("Sream API or secret is missing");
}

const streamClient=StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser=async (userData)=>{
    try{
        await streamClient.upsertUsers([userData]); // upsert means create and if it already exists then update
        return userData;
    }
    catch(error){
        console.error("Error upserting stream user:", error);
    }
}

// todo: to do it later
export const generateStreamToken=(userId)=>{
    try{
        // ensure userId is a string
        const userIdStr=userId.toString();
        return streamClient.createToken(userIdStr);
    }
    catch(error){
        console.log("Error genertaing Stream token:", error);
    }
}