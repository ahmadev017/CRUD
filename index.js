let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
require('dotenv').config();

const enquiryRouter = require('./app/routes/web/enquiryRoutes');

let app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/website/enquiry', enquiryRouter);

// MongoDB Connection
mongoose.connect(process.env.DBURL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

// ✅ Export the app for Vercel
module.exports = app;

