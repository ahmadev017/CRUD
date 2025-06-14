import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import enquiryRoutes from './app/routes/web/enquiryRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// ✅ Enable CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://crud-frontend-8br5.vercel.app' // ✅ your frontend deployed domain
];

app.use(cors({
  origin: allowedOrigins,
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

  // No app.listen() in Vercel!
  console.log("✅ Connected to MongoDB");
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

export default app;


