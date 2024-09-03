import connectDb from "@/database/db";
import Category from "@/model/category";
import { NextResponse } from "next/server";

connectDb()

export async function GET(req){
    const allCategory=await Category.find({});
    if(!allCategory){
        return NextResponse.json({
            message:"no category found",
            success:false
        })
    }
    {
        return NextResponse.json({
            message:"category found",
            success:true,
            data:allCategory
        })
    }
}