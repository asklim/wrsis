import debugFactory from "debug";
const debug = debugFactory( 'view:whoops404' );
//const debug = require( "debug")( 'view:whoops404' );

import React from "react";
import PropTypes from "prop-types";
import {
    Link,
    useRouteMatch,
    useLocation,
} from "react-router-dom";

// core components
import GridItem from "components/m-d-r/Grid/GridItem.js";
import GridContainer from "components/m-d-r/Grid/GridContainer.js";
import SnackbarContent from "components/m-d-r/Snackbar/SnackbarContent.js";

import Card from "components/m-d-r/Card/Card.js";
import CardHeader from "components/m-d-r/Card/CardHeader.js";
import CardBody from "components/m-d-r/Card/CardBody.js";
import CardFooter from "components/m-d-r/Card/CardFooter.js";

// @material-ui
import { MoodBad as WhoopsIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles( {} );


const Whoops404 = (props) => {

    const classes  = useStyles();
    const match = useRouteMatch();
    const location = useLocation();

    debug( 'props:', Object.keys( props ), props );
    debug( 'useRouteMatch:', match );

    const { callFrom } = props;

    const infoHeaderTitle = `call from: ${callFrom}`;

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={8} lg={4}>
                <SnackbarContent
                    message = {
                        `Resource not found at '${location.pathname}'`
                    }
                    color="info"
                    icon={WhoopsIcon}
                />

                <Card>
                    <CardHeader color="info" stats>
                        <h5 className={classes.cardTitle}>{infoHeaderTitle}</h5>
                    </CardHeader>
                    
                    <CardBody>
                        <h6>props:</h6>
                        <p>{JSON.stringify( Object.keys( props ))}</p>                       
                    </CardBody>
                    
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <p>location:</p>
                            {JSON.stringify( location )}
                            <p>match:</p>
                            {JSON.stringify( match )} 
                        </div>
                    </CardFooter>
                </Card>

                <Link to="/">Go to Home page (Admin / Dashboard)</Link>
            </GridItem>
        </GridContainer>
    );
};

Whoops404.propTypes = {
    //history: PropTypes.object,    
    //match: PropTypes.object,
    //location: PropTypes.object,
    callFrom: PropTypes.string,
};

export default Whoops404;
