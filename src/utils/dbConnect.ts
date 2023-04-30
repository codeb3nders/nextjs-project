import mongoose from "mongoose";

const connectMongo = async () => {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log(`Mongoose connected: ${mongoose.connection.readyState === 1}`);
};

export default connectMongo;
