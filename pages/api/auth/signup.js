// pages/api/register.js
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { email, password } = req.body;
      const client = new MongoClient(MONGODB_URI);
      await client.connect();
      const db = client.db("chatbotDB");
      await db.command({ ping: 1 });  
      // Hash the password before storing it
      const hashedPassword = bcrypt.hashSync(password, 10);
      await db.collection('users').insertOne({
        email: email,
        password: hashedPassword
      });

      await client.close();
      res.status(200).send({ message: "User created successfully!" });
    } else {
      res.status(405).send({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
