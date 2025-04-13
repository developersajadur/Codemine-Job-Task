/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"


import { MongoClient, ServerApiVersion } from "mongodb";

let db: any;

export const ConnectWithDB = async () => {
  if (db) return db;

  try {
    const uri = process.env.NEXT_PUBLIC_DATABASE_URI ;
    if (!uri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    await client.connect();
    db = client.db("Images-Gallery");
    console.log("Connected to MongoDB Database");
    return db;
    
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
