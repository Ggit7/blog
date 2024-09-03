import connectDb from "@/database/db";
import User from "@/model/users";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'


connectDb()
export async function POST(req){
    const {name,email,password}= await req.json()
try {
    
    const isUser=await User.findOne({email})
    if(isUser){
        return NextResponse.json({
            message:'email alredy exist',
            success:false,
            status:false
        },
    {
        status: 400
    }
)}
const salt=await bcryptjs.genSalt(10)
const hashedPassword=await bcryptjs.hash(password,salt)
const newuser=new User({
    name,
    email,
    password:hashedPassword
})
const saveduser=await newuser.save()

return NextResponse.json({
    message:'singup successfull',
    success:true,
    data:saveduser
})
} catch (error) {
    return NextResponse.json({
        message:error,
        success:false

    })
}
}