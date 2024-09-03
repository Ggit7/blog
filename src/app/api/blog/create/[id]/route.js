import connectDb from "@/database/db";
import Category from "@/model/category";
import Blog from "@/model/blog";  // Assuming you have a Blog model
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

await connectDb();  // Ensure the database connection is established

export async function POST(req, { params }) {
    try {
        const { id } = params;
        const { title, description } = await req.json();

        // Get the JWT token from cookies
        const token = req.cookies.get('authtoken')?.value;
        if (!token) {
            return NextResponse.json({
                message: "Authentication token not found",
                success: false,
            });
        }

        // Verify the JWT token
        const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);

        // Check if the category ID is provided
        if (!id) {
            return NextResponse.json({
                message: "Category not found",
                success: false,
            });
        }

        // Find the category by ID
        const category = await Category.findOne({ _id: id });
        if (!category) {
            return NextResponse.json({
                message: "Category does not exist",
                success: false,
            });
        }

        // Check if the logged-in user is the owner of the category
        if (category.user.toString() !== decodeToken.id) {
            return NextResponse.json({
                message: "You are not authorized to create a blog under this category",
                success: false,
            });
        }

        // Create a new blog post
        const newBlog = new Blog({
            title,
            description,
            category: id,
            user: decodeToken.id,
        });

        // Save the new blog post to the database
        const saveBlog=await newBlog.save();

        // Return the created blog post or a success message
        return NextResponse.json({
            message: "Blog post created successfully",
            success: true,
            data: saveBlog,  // Optionally return the created blog post
        });

    } catch (error) {
        return NextResponse.json({
            message: "An error occurred",
            success: false,
            error: error.message,
        });
    }
}
