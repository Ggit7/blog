import mongoose from "mongoose";

const connectDb=async()=>{
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('complete')
    })
}
export default connectDb