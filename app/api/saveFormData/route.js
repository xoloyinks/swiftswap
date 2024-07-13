import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI; // Your MongoDB connection string
// const options = {};

// let client;
// let clientPromise;

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your MongoDB URI to .env.local');
// }

// if (process.env.NODE_ENV === 'development') {
//   // In development mode, use a global variable so the client is not constantly recreated
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export async function POST(req) {
//   const body = await req.json();
  
//   try {
//     const client = await clientPromise;
//     const db = client.db('your_database_name'); // Replace with your database name
//     const collection = db.collection('formData'); // Replace with your collection name

//     const result = await collection.insertOne(body);
//     return new Response(JSON.stringify({ success: true, result }), { status: 200 });
//   } catch (error) {
//     console.error('Error saving form data:', error);
//     return new Response(JSON.stringify({ success: false, error }), { status: 500 });
//   }
// }
