const GOOGLE_CLIENT_ID = `489764654230-801ptqbf4cpl0ge00qv94rd9m8a587t7.apps.googleusercontent.com`
const GOOGLE_CLIENT_SECRET = `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`

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
