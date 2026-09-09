import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // 1. Basic Validation 
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Oops, you haven't filled all the fields." },
        { status: 400 }
      );
    }

    // 2. Email Format Validation 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 3. Password Length Validation 
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Try to use a password with at least 6 characters." },
        { status: 400 }
      );
    }

    // 4. Mock User Data 👤
    const newUser = {
      id: 'user_123',
      name,
      email,
    };

    // 5. JWT Token 🔑
    const secret = process.env.JWT_SECRET || 'fallback_secret';
    
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      secret,
      { expiresIn: '360d' }
    );

    return NextResponse.json({
      message: "Hurray! You created a waves account successfully.",
      user: newUser,
      token: token,
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}