import React, { 
    useState, useEffect 
} from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


import UserIdInputForm from './UserIdInputForm';
import InfoPanel from './InfoPanel';

import viewStyle from 'assets/jss/m-d-r/views/dashboardStyle.js';

const {
    cardCategoryWhite,
    cardTitleWhite,
} = viewStyle;

import styles from "assets/jss/misc/todosInputListStyle.js";

const useStyles = makeStyles( {
    ... styles(),
    ... cardCategoryWhite,
    ... cardTitleWhite,
    typo: {
        paddingLeft: "25%",
        marginBottom: "40px",
        position: "relative"
    },
});

const { ViberClient } = require( 'messaging-api-viber' );
const client = new ViberClient ({
    accessToken: process.env.VIBER_CHAT_TOKEN,
    sender: "mikavitebsk"
});


const ViberUserInfo = () => {

    const classes = useStyles();
    const [ userId, setUserId ] = useState( '' );  
    const [ userDetails, setUserDetails ] = useState( { user: 'init' } );
    const [ accountInfo, setAccountInfo ] = useState( { account: 'init' } );

    const saveUserId = idText => {
        //console.log('save User Id.');
        let id = idText.trim();
        if( id ) {
            setUserId( id );
        }
    };
    
    const getAccountInfo = async () => {
        try {
            let info = await client.getAccountInfo();
            console.log( 'get Account Info\n', info );
            setAccountInfo( info );
        }
        catch (error) {
            console.log( 'CATCH: get Account Info\n', error );
            setAccountInfo( error );
        }
    };

    const getUserDetails = (id) => { 
        //console.log('get User Details.');
        client.getUserDetails( id )
            .then( details => setUserDetails( details ))
            .catch( error => setUserDetails( error ));
    };

    //Эффект применяется после рендеринга и только 1 раз
    useEffect( () => getAccountInfo(), [] );

    useEffect( () => getUserDetails( userId ), [ userId ]);

    return ( 
        <div>
            <UserIdInputForm saveUserId ={saveUserId} />
            <InfoPanel title ={`Viber User ${userId} Details`} info ={userDetails} classes ={classes}/>
            <InfoPanel title ={'Viber Public Account Details'} info ={accountInfo} classes ={classes}/>
        </div>
    );
};

export default ViberUserInfo;
