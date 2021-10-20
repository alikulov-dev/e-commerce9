const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const ejs = require("ejs");
// Setting
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const MongoURI = "mongodb://localhost:27017/umdsoft";
mongoose
  .connect(MongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Mongodb is running`);
  });
const store = new MongoDBSession({
  uri: MongoURI,
  collection: "MYSession",
});
app.use(
  session({
    secret: "this_is_session_secret_key_07565434546",
    saveUninitialized: false,
    store: store,
    resave: false,

    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "strict",
    },
  })
);
app.use(cookieParser());

app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("tiny"));
app.use(express.static("./public"));
app.use(express.static(path.join(__dirname, "public")));
// require('./utils/logger')();
require("./routes/index")(app);

app.use("/api/article", require("./routes/article"));
app.use("/api/snippet", require("./routes/snippet"));
app.use("/api/template", require("./routes/template"));
app.use("/api/user", require("./routes/user"));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`${PORT} server running`);
});
