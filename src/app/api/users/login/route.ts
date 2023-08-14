import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("user does not exist")
      return NextResponse.json(
        {
          error: "User does not exist",
        },
        {
          status: 400,
        }
      );
      console.log(user);
    } else {
      const validPassword = await bcryptjs.compare(password, user.password);
      if (!validPassword) {
        console.log("invalidPassword")
        return NextResponse.json(
          {
            error: "Invalid password",
          },
          {
            status: 400,
          }
        );
      }
      const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email,
      };

      // create and assign token
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

    const response= NextResponse.json({
        message: "Logged in successfully",
        token,
      });
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: true,
    });
    return response;
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
