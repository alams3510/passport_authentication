const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");
const UserModal = require("./model");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const port = process.env.PORT || 5000;
require("./database/db");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const authRoutes = require("./routes/authRoutes");
const session = require("express-session");

app.use(
  session({
    secret: process.env.SESSION_SECRET, // A secret key for session signing
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create a session until something is stored
    cookie: {
      maxAge: 1000 * 60 * 60 * 1, // Session expiration time (1 hr in this example)
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      prompt: "consent",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserModal.findOne({ email: profile._json.email });
        if (!user) {
          user = await UserModal.create({
            name: profile._json.name,
            email: profile._json.email,
            image: profile._json.picture,
          });
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Serialize and deserialize user information to/from session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModal.findById({ _id: id }); // Retrieve the user from the database using the ID
    done(null, user); // Pass the user object to the next middleware
  } catch (error) {
    done(error, null); // Pass the error if something goes wrong
  }
});

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.listen(port, () => {
  console.log("server is started on port : ", port);
});
