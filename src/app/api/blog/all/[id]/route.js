import connectDb from "@/database/db";
import Blog from "@/model/blog";
import { NextResponse } from "next/server";
import User from "@/model/users";

connectDb()

export async function GET(request,{params}){
    const {id}=params
    const allBlog=await Blog.find({category:id}).populate("user", ["name", "email"]);
    if(allBlog.length==0){
        return NextResponse.json({
            message:"no blog found",
            success:false
        },
        {
            status:404,
        });
    }
    return NextResponse.json({
        message:"blog fetched succesfully",
        success:true,
        data:allBlog
    })
}
