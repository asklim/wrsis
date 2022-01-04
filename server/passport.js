
const passport = require( 'passport' );
const LocalStrategy = require( 'passport-local' ).Strategy;
const db = require( './databases' ).getDB( 'config' );
const User = db.model( 'User' );

passport.use( new LocalStrategy(
    {
        usernameField : 'email'
    },
    (username, password, done) => {
        User.findOne(
            { email : username },
            (err, user) => {
                if( err ) {
                    return done( err );
                }
                if( !user ) {
                    return done( null, false,
                        { message : 'Incorrect username.' }
                    );
                } 
                if( !user.isValidPassword( password )) {
                    return done( null, false,
                        { message : 'Incorrect password.' }
                    );
                }
                return done( null, user );
            }
        );
    }
));

