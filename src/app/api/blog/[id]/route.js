import connectDb from "@/database/db";
import Blog from "@/model/blog";
import { NextResponse } from "next/server";


connectDb()

export async function GET(request,{params}){
    const {id}=params
    const singleBlog=await Blog.find({category:id})
    if(singleBlog.length==0){
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
        data:singleBlog
    })
}
