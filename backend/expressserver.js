// Import necessary packages
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcrypt'); // Import bcrypt for hashing passwords

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

const uri = "mongodb+srv://ushasree:<Usha1310>@spotifywebsite.uowrtpy.mongodb.net/?retryWrites=true&w=majority&appName=Spotifywebsite";

// Encode the password
const encodedPassword = encodeURIComponent("Usha1310");
const newUri = uri.replace("<Usha1310>", encodedPassword);

const client = new MongoClient(newUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Function to connect to MongoDB
async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

// Run the database connection function
connectToDB();

// Define the 'signup' endpoint
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const database = client.db("Spotifywebsite");
    const usersCollection = database.collection("users");

    // Check if the email already exists
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      // Email exists, try to log in the user
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (isPasswordValid) {
        res.status(200).json({ status: "success", data: existingUser, message: "User logged in successfully!" });
      } else {
        res.status(401).json({ status: "error", message: "Invalid email or password." });
      }
    } else {
      // Email does not exist, create a new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await usersCollection.insertOne({ username, email, password: hashedPassword });
      res.status(201).json({ status: "success", data: result, message: "User created successfully!" });
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ status: "error", message: "Internal server error." });
  }
});

// Define the 'login' endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const database = client.db("Spotifywebsite");
    const usersCollection = database.collection("users");

    // Find the user by email
    const user = await usersCollection.findOne({ email });

    if (user) {
      // Compare the hashed password with the provided password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        res.json({ status: "success", data: user });
      } else {
        res.status(401).json({ status: "error", message: "Invalid email or password." });
      }
    } else {
      res.status(401).json({ status: "error", message: "Invalid email or password." });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ status: "error", message: "Internal server error." });
  }
});

// Start the server
const PORT = 8003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
