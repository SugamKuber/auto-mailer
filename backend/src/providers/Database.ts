import mongoose from "mongoose";

export class Database {

  public static init(): void {
    mongoose.connect(process.env.MONGO_URI);

    mongoose.connection.on("error", (err) => {
      console.log('MongoDB connection error: ' + err);
      process.exit();
    });
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB");
    });

  }
}

export default mongoose;