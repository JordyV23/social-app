import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import { register, createPost } from "./controllers/index.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import { verifyToken } from "./middleware/auth.js";

// Importar datos y modelos para prueba
// import User from "./models/user.js";
// import Post from "./models/post.js";
// import { users, posts } from "./data/index.js";

// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Configurar el almacenado de archivos
const storage = multer.diskStorage({
  destination: function (res, file, cb) {
    cb(null, "public/assets");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Rutas con archivos
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// Rutas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Conexion a Mongo
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`El servidor esta corriendo en http://localhost:${PORT}`)
    );

    // Insertar datos de prueba
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(` ${error} `));
