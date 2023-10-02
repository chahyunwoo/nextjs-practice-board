import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URL;

let mongoClientInstance: Promise<MongoClient>;

export async function connectDB(): Promise<MongoClient> {
  if (!url) {
    throw new Error("MONGODB_URL environment variable is not defined.");
  }

  if (process.env.NODE_ENV === "development") {
    if (!mongoClientInstance) {
      mongoClientInstance = new MongoClient(url).connect();
    }
    return mongoClientInstance;
  } else {
    return new MongoClient(url).connect();
  }
}
