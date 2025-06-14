import express from 'express';
import cors from 'cors';
import enquiryRoutes from './app/routes/web/enquiryRoutes.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://crud-frontend-8br5.vercel.app',
    'https://crud-frontend-9nam.vercel.app'  // ✅ Add this!
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend is live!");
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ MongoDB connected");
  app.use('/api/website/enquiry', enquiryRoutes);
}).catch((err) => {
  console.log("❌ MongoDB connection error", err);
});

// ❌ Do NOT do this in Vercel: app.listen(...)

export default app; // ✅ required for Vercel


