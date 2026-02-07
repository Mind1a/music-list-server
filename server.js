import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import musicRoutes from "./routes/musicRoutes.js";

// გარემოს ცვლადების კონფიგურაცია, შეგვიძლია გამოვიყენოთ .env ფაილი
dotenv.config();

// Express აპლიკაციის შექმნა
const app = express();

// კონფიგურაცია პორტის
const PORT = process.env.PORT || 5000;

// MongoDB კავშირის სტრინგი
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(
  cors(
    // 5173-ისგან მოთხოვნების მიღება
    { origin: "http://localhost:5173" },
    { methods: ["GET", "POST", "PUT", "DELETE"] },
  ),
);

// JSON-ის დამუშავება და გადაქცევა ობიექტებად
app.use(express.json());

// MongoDB-სთან დაკავშირება
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB-თან დაკავშირება წარმატებულია");
  })
  .catch((error) => {
    console.error("❌ MongoDB-სთან დაკავშირება ვერ მოხერხდა:", error.message);
    process.exit(1);
  });

// Routes
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Music API server is running" });
});

// facebook.com/music -> musicRoutes
app.use("/music", musicRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
