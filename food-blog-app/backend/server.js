const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/connectionDB");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Connect to MongoDB Atlas
connectDB();

// ✅ Middlewares
app.use(express.json());

const cors = require("cors");

app.use(cors({
  origin: ["http://localhost:5173", "https://food-blogv-8.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.static("public"));

// ✅ Routes
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

app.use("/user", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));

// ✅ Start server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});