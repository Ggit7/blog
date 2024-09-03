import connectDb from "@/database/db";
import Blog from "@/model/blog";
import { NextResponse } from "next/server";


connectDb()


export async function DELETE(request,{params}){
    const {id}=params
    const isBlog=await Blog.findOne({_id:id});
    if(!isBlog){
        return NextResponse.json({
            message:"no blog found",
            success:false
        },
        {
            status:404,
        });
    }
    const deletedBlog=await Blog.findByIdAndDelete(id)
    if(!deletedBlog){
    return NextResponse.json({
        message:"blog not delete succesfully",
        success:false,
    })
}
return NextResponse.json({
    message:"Blog Deleted",
    success:true
})
}
