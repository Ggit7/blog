import connectDb from "@/database/db";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import Category from "@/model/category";

connectDb();

export async function POST(req) {
    const { title, description } = await req.json();

    if (!title) {
        return NextResponse.json({
            message: 'Title required',
            success: false
        }, {
            status: 400 // Bad Request
        });
    }

    if (!description) {
        return NextResponse.json({
            message: 'Description required',
            success: false
        }, {
            status: 400 // Bad Request
        });
    }
    const allCategory=await Category.find({})
    const categoryExist=allCategory.filter((category)=>{
        return category.title.toLowerCase()===title.toLowerCase()
    })
    if(categoryExist){
        return NextResponse.json({
            message:"Category exist",
            success:false
        },{
            status:409
        })
    }

    try {
        const token = req.cookies.get('authtoken')?.value;

        if (!token) {
            return NextResponse.json({
                message: 'Authentication required',
                success: false
            }, {
                status: 401 // Unauthorized
            });
        }

        const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);

        const newCategory = new Category({
            title,
            description,
            user: decodeToken.id
        });

        await newCategory.save();

        return NextResponse.json({
            message: 'Category created successfully',
            success: true,
            data: newCategory
        }, {
            status: 201 // Created
        });

    } catch (error) {
        return NextResponse.json({
            message: error.message || 'Internal server error',
            success: false
        }, {
            status: 500 // Internal Server Error
        });
    }
}
