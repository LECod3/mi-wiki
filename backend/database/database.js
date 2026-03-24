import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection to MongoDB successfull");
  } catch (error) {
    console.log("Connection to DB failed. Try again", error);
    process.exit(1);
  }
};

export { connectDB };
