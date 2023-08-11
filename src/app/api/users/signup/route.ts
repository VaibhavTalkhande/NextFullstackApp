import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;
    console.log(reqBody);

    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
        return NextResponse.json({
            body: {
            error: "User already exists",
            },
        });
        }
        
        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create new user
        const newUser = new User({
        name,
        email,
        password: hashedPassword,
        });

        // save user and return response
        const savedUser = await newUser.save();
        console.log(savedUser);
        return NextResponse.json({
        body: {
            message: "User created successfully",
            user: savedUser,
        },
        });
    } catch (error) {
        return NextResponse.json({
        status: 500,
        body: {
            error: "Server error",
        },
        });
    }
}





