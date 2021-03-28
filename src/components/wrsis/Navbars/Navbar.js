const debug = require( "debug")( 'component:Navbar' );

import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
    AppBar,
    Toolbar,
    IconButton,
    Hidden 
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import RTLNavbarLinks from "./RTLNavbarLinks.js";
import Button from "components/m-d-r/CustomButtons/Button.js";

import styles from "assets/jss/m-d-r/components/headerStyle.js";

const useStyles = makeStyles( styles );


export default function Header (props) {

    const classes = useStyles();


    function setWindowTabTitle (name) {
        
        const separator = ' | ';
        const current = window.document.title;
        const parts = current.split( separator );
        const appTitle = parts[1] || parts[0] || current;
        window.document.title = name + separator + appTitle;
    }


    function makeBrand () {

        let name;
        function isActivePath (route) {
            return window.location.href.includes( route.layout + route.path );
        }        

        props.routes
        .forEach( 
            (route) => {
                if( isActivePath( route )) {
                    name = props.rtlActive ? route.rtlName : route.name;
                }
                //return null;
            }
        );
        
        debug( 'makeBrand return name:', name );
        name && setWindowTabTitle( name );

        return name;
    }

    const { color } = props;
    const appBarClasses = classNames({ [" " + classes[color]]: color });

    return (
        <AppBar 
            className={classes.appBar + appBarClasses}
        >
            <Toolbar className={classes.container}>

                <div className={classes.flex}>
                    {/* Here we create navbar brand, based on route name */}
                    <Button color="transparent" href="#" className={classes.title}>
                        {makeBrand()}
                    </Button>
                </div>

                <Hidden smDown implementation="css">
                    {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
                </Hidden>
                
                <Hidden mdUp implementation="css">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.handleDrawerToggle}
                    >
                        <Menu />
                    </IconButton>
                </Hidden>

            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    color: PropTypes.oneOf([ "primary", "info", "success", "warning", "danger" ]),
    rtlActive: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    routes: PropTypes.arrayOf( PropTypes.object )
};
