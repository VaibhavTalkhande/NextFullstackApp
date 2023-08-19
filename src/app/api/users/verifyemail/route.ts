import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { use } from "react";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({ verifyToken: token });
    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid token",
        },
        {
          status: 400,
        }
      );
    }
    console.log(user);
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
