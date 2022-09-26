const express = require("express");
const app = express();
const cors = require("cors");
const { Sequelize, QueryTypes } = require("sequelize");
const initModels = require("./models/init-models");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const DIR = "./uploads/";

let models;
async function connection() {
  const sequelize = new Sequelize("blogged", "root", "", {
    host: "localhost",
    dialect: "mysql",
  });
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  models = initModels(sequelize);
}
connection();
const PORT = 3300;

app.use("/uploads", express.static("public"));
app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.static(path.join(__dirname, "./")));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await models.user.create({
      username,
      email,
      password,
    });
    return res.sendStatus(201);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await models.user.findOne(
      {
        email,
        password,
      },
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const token = await jwt.sign(
      {
        id: user.dataValues.id,
        username: user.dataValues.username,
        email: user.dataValues.email,
      },
      process.env.SECRET_KEY
    );
    return res.status(200).send({
      token,
      id: user.dataValues.id,
      username: user.dataValues.username,
      email: user.dataValues.email,
    });
  } catch (e) {
    return res.sendStatus(500);
  }
});
app.post("/add-blog", upload.single("profileImg"), async (req, res, next) => {
  try {
    const { header, text, id } = req.body;
    console.log(req.body);
    await models.blogs.create({
      user_id: id,
      blog_image: "/uploads/" + req.file.filename,
      blog_text: text,
      blog_header: header,
    });
    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
});
app.get("/allBlogs", async (req, res) => {
  try {
    const blogs = await models.blogs.findAll();
    return res.status(200).send(blogs);
  } catch (err) {
    return res.sendStatus(500);
  }
});
app.get("/getBlog/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await models.blogs.findOne({
      where: { id },
    });
    return res.status(200).send(blogs);
  } catch (err) {
    return res.sendStatus(500);
  }
});
app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});
