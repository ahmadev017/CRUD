import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import enquiryRoutes from './app/routes/web/enquiryRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// ✅ Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ CSP header (optional)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com; script-src 'self';"
  );
  next();
});

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");

  app.use('/api/website/enquiry', enquiryRoutes);

  app.listen(8000, () => {
    console.log("🚀 Server running on port 8000");
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

