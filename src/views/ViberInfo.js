const debug = require( "debug")( 'view:ViberInfo' );

import React  from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import Typography from '@material-ui/core/Typography';


// core components
import GridItem from "components/m-d-r/Grid/GridItem.js";
import GridContainer from "components/m-d-r/Grid/GridContainer.js";
import { 
    Card,
    CardHeader,
    CardBody,
} from "components/m-d-r/Card/index.mjs";

import { ViberUserInfo } from "components/misc/Viber";

import dashboard from "assets/jss/m-d-r/views/dashboardStyle.js";

const styles = {
    cardCategoryWhite: {
        ... dashboard.cardCategoryWhite,
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        ... dashboard.cardTitleWhite,
        "& small": {
            ... dashboard.cardTitleWhite["& small"],
            fontSize: "65%"
        }
    }
};

const useStyles = makeStyles( styles );


export default function ViberInfo() {
    
    const classes = useStyles();
    debug('in view.');

    return (<GridContainer>

        <GridItem xs={12} sm={12} md={8} lg={6} xl={4}>
            <Card>
                <CardHeader color="warning">
                    <h4 className={classes.cardTitleWhite}>
                            Viber Info Panel
                    </h4>
                    <p className={classes.cardCategoryWhite}>
                            Simple Viber Client
                    </p>
                </CardHeader>

                <CardBody>
                    <ViberUserInfo />
                </CardBody>

            </Card>
        </GridItem>

    </GridContainer>);
}
