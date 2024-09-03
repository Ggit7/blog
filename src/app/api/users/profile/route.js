import connectDb from "@/database/db";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import User from "@/model/users";

connectDb()

export async function GET(req){
    const token=req.cookies.get('authtoken')?.value
    const decodeToken=jwt.verify(token, process.env.TOKEN_SECRET)
    const user=await User.findOne({_id:decodeToken.id}).select("-password")
    if(!user){
        return NextResponse.json({
            message:'user does not exist',
            success:false
        })
    }
    return NextResponse.json({
        message:'user get',
        success:true,
        data:user
    })
}