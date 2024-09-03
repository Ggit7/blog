import connectDb from "@/database/db";
import User from "@/model/users";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDb();

export async function POST(req) {
    const { email, password } = await req.json();

    try {
        const isUser = await User.findOne({ email });
        if (!isUser) {
            return NextResponse.json({
                message: 'Invalid credentials',
                success: false
            }, {
                status: 401 
            });
        }

        const isPassword = await bcryptjs.compare(password, isUser.password);
        if (!isPassword) {
            return NextResponse.json({
                message: 'Invalid credentials',
                success: false
            }, {
                status: 401 
            });
        }

        const tokenData = {
            id: isUser._id,
            name: isUser.name,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: '2d'
        });

        const response = NextResponse.json({
            message: 'Login successful',
            success: true
        });

        response.cookies.set('authtoken', token, {
            httpOnly: true,
        });

        return response;
    } catch (error) {
        return NextResponse.json({
            message: error.message || 'Internal server error',
            success: false
        }, {
            status: 500 
        });
    }
}
