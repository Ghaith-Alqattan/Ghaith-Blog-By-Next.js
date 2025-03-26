import { MongoClient } from 'mongodb'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === 0 ||
      !message ||
      message.trim() === 0
    ) {
      res.status(422).json({ message: 'invalid Input.' })
      return
    }
    const newMessage = {
      name,
      email,
      message,
    }
    let client
    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.hsyjj.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority&appName=${process.env.mongodb_database}`
    try {
      client = await MongoClient.connect(connectionString)
      const db = client.db()
      const result = await db.collection('messages').insertOne(newMessage)
      newMessage._id = result.insertedId
      console.log(result)
    } catch (error) {
      res.status(500).json({ message: 'Something Went Wrong!' })
      return
    }

    client.close()
    res
      .status(201)
      .json({ message: 'message stored successfully!', message: newMessage })
  }
}
