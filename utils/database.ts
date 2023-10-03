import { MongoClient } from "mongodb";

let mongoClientInstance: Promise<MongoClient>;

export async function connectDB(): Promise<MongoClient> {
  if (process.env.NODE_ENV === "development") {
    if (!mongoClientInstance) {
      mongoClientInstance = new MongoClient(process.env.MONGODB_URI!).connect();
    }
    return mongoClientInstance;
  } else {
    return new MongoClient(process.env.MONGODB_URI!).connect();
  }
}
