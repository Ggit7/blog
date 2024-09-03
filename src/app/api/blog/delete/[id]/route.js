import connectDb from "@/database/db";
import Blog from "@/model/blog";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Ensure the database connection is established once
connectDb();

export async function DELETE(request, { params }) {
        const token = request.cookies.get("authtoken")?.value;
        if (!token) {
            return NextResponse.json({
                message: "Authentication failed",
                success: false,
            }, {
                status: 403,
            });
        }

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const { id } = params;

        const isBlog = await Blog.findOne({ _id: id });
        if (!isBlog) {
            return NextResponse.json({
                message: "No blog found",
                success: false,
            }, {
                status: 404,
            });
        }

        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return NextResponse.json({
                message: "Blog not deleted successfully",
                success: false,
            }, {
                status: 500,
            });
        }

        return NextResponse.json({
            message: "Blog deleted",
            success: true,
        });


}
