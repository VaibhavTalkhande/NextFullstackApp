import mongoose from "mongoose";

export async function connect(){
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        
        const connection = mongoose.connection;
        connection.on('open', () => {
            console.log('MongoDB database connection established successfully');
        });
        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        });


    } catch(error){
        console.log(error);
        

    }
}