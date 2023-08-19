import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

const sendEmail = async ({ email,emailType ,userId}:any) => {
    try{
        // create hash token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if(emailType === 'VERIFY')
    {
        await User.findByIdAndUpdate(userId,
           {
                verifyToken: hashedToken,
                forgotPasswordTokenExpires: Date.now() + 3600000,
           } )
    }
    else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId,
            {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpires: Date.now() + 3600000,
            } )

    }
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "1798030602b292",
          pass: "bb018e6730fff8"
        }
    });
    const mailOptions = {
        from: 'vaibhav@gmail.com',
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`
    }
}
    catch(err: any){
        throw new Error(err.message);
        console.log(err);
    }
}