const passport = require( 'passport' );
const db = require( '../../databases' ).getDB( 'config' );
const User = db.model( 'User' );

const { 
    //icwd, 
    //consoleLogger,
    //sendJSONresponse,
    send200Ok,
    send400BadRequest,
    send401UnAuthorized,
    send500ServerError,
} = require( '../../helpers' );


module.exports.register = function (req, res) {

    const { 
        name,
        email,
        password, 
    } = req.body;

    if( !name || !email || !password ) {
        return send400BadRequest( res, "All fields required." );
    }

    const user = new User();

    user.name = name;
    user.email = email;
    user.setPassword( password );

    user.save(
        (err) => {      
            if( err ) {
                return send500ServerError(res, err);   
            } 
            else {
                let token = user.generateJwt();
                return send200Ok(res, { "token" : token });  
            }
        }
    );
};


module.exports.login = function (req, res) {

    const { 
        email,
        password 
    } = req.body;

    if( !email || !password ) {
        return send400BadRequest( res, "All fields required." );
    }

    passport.authenticate(
        'local',
        (err, user, info) => {
            if(err) {
                return send500ServerError( res, err ); 
            }

            if( user ) {
                let token = user.generateJwt();
                return send200Ok(res, { "token" : token });
                //res.redirect(303,'/levelA');
            }
            else {
                send401UnAuthorized(res, info);
            }
        }
    )( req, res );
};

