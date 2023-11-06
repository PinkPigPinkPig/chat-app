const mongoose = require("mongoose")

const connectDB = async () => {
  console.log(process.env.MONGO_URI)
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {})

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit()
  }
}

module.exports = connectDB
