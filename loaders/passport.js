const passport = require('passport');
const LocalStrategy = require('passport-local');

const AuthService = require('../services/AuthService');
const AuthServiceInstance = new AuthService();

module.exports = (app) => {

  // Initialize passport
  app.use(passport.initialize());  
  app.use(passport.session());
  
  // serialize data to store in cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // deserialize data stored in cookie attach to req.user
  passport.deserializeUser((id, done) => {
    done(null, { id });
  });

  // Configure local strategy to be use for local login
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await AuthServiceInstance.login({ email: username, password });
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    }
  ));

  return passport;

}