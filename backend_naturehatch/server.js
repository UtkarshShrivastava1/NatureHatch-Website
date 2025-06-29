const express = require("express");
const app = express();


const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require("cors");

const axios = require("axios");
axios.defaults.withCredentials = true;



const mongoose = require("mongoose");
require("colors"); // Import colors.js
const fileUpload = require("express-fileupload");

const {initializeAdmin} = require("./models/AdminModel");

const isProduction = process.env.NODE_ENV === "production";

const mongoURI = isProduction
  ? process.env.MONGO_ATLAS_URI
  : process.env.MONGO_LOCAL_URI;

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    initializeAdmin();
    console.log(
      `Successfully connected to MongoDB (${process.env.NODE_ENV})`
        .brightMagenta.bold.italic
    );
    console.log(`MongoDB URI:`.blue + ` ${mongoURI}`.brightMagenta.bold.italic);
        // Create a simple test model and document
        // const Test = mongoose.model('Test', new mongoose.Schema({ name: String }));
        // return Test.create({ name: 'test document' });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB".red, err);
    process.exit(1);
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(fileUpload({
    useTempFiles: true,
  }));
  // app.use(cors({
  //   origin: isProduction ? process.env.CLIENT_URL : "http://localhost:5174",
  //   credentials: true,
  // }));

  const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/user",require("./routes/userRoutes"));
app.use("/api/products",require("./routes/productRoutes"));
app.use("/api/blog",require("./routes/blogRoutes"));
app.use("/api/order",require("./routes/orderRoutes"));

const PORT = process.env.PORT|| 3000; // Default to 3000 if PORT is not set in .env

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
