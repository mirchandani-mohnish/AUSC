var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
const googleStrategy = require('passport-google-oauth');



passport.use(new googleStrategy({


}), function(){
    // passport callback function;
});
passport.use(new localStrategy({
    
}))