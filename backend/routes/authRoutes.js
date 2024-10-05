const router = require("express").Router();
const passport = require("passport");

// Google Authentication Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failed" }),
  (req, res) => {
    // Successful login
    const { name, email, image } = req.user;
    res.redirect(
      `${process.env.REDIRECT_URL}?name=${name}&email=${email}&image=${image}`
    ); // Redirect to the frontend
  }
);

module.exports = router;
