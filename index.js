import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import enquiryRoutes from './app/routes/web/enquiryRoutes.js';

dotenv.config();
const app = express();

// ✅ CORS Setup
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://crud-frontend-9nam.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api/website/enquiry', enquiryRoutes);
app.get("/", (req, res) => res.send("Backend is running ✅"));

// ✅ MongoDB Connect (recommended: keep outside export block)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// ✅ Export app for Vercel
export default app;


