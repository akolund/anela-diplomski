const JwtStrategy= require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/user');
const config = require('../config/databaseJS');

module.exports = function(passport){

  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); User.findOne({id: jwt_payload.sub}, (err, user) => {
// console.log(passport.use(new JwtStrategy(opts,function(jwt_payload, done){console.log('aaaa');})));
  passport.use(new JwtStrategy(opts,function(jwt_payload, done){
// console.log('eeeeeeeeeeee');
    User.getUserById(jwt_payload.data._id, (err, user) => {
      // console.log('aaaaaaaaaaa');
      if(err){
        return done(err,false);
      }
      if(user){
        return done(null, user);
      }else{
        return done(null, false);
      }

  });
}));
}
