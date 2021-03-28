//const debug = require( "debug")( 'component:Sidebar' );

import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
    Drawer,
    Hidden,
    List,
    ListItem,
    ListItemText,
    Icon,
} from "@material-ui/core";

// core components
import AdminNavbarLinks from "components/wrsis/Navbars/AdminNavbarLinks.js";
import RTLNavbarLinks from "components/wrsis/Navbars/RTLNavbarLinks.js";

import TopBrand from "./TopBrand";
import styles from "./sidebarStyle.js";

const useStyles = makeStyles( styles );


export default function Sidebar (props) {


    const classes = useStyles();
    
    const { 
        color, image, 
        //logo, logoText, 
        routes 
    } = props;

    // verifies if routeName is the one active (in browser input)
    function isActiveRoute (routeName) {
        return window.location.href.includes( routeName ); // > -1 ? true : false;
    }

    function isSpecialButtonRoute (routeName) {
        return ([ 
            "/uisamples/upgrade-to-pro", 
            "/uisamples" 
        ].includes( routeName ));
    }
    
    var links = (
        <List className={classes.list}>
            {routes
            .map( (route, key) => {
                let activePro = " ";
                let listItemClasses;
                const pathname = route.layout + route.path;
                const isActivePath = isActiveRoute( pathname );

                if( isSpecialButtonRoute( pathname )) {
                    activePro = classes.activePro + " ";
                    listItemClasses = classNames({
                        [" " + classes[color]]: true
                    });
                } 
                else {
                    listItemClasses = classNames({
                        [" " + classes[color]]: isActivePath
                    });
                }

                const whiteFontClasses = classNames({
                    [" " + classes.whiteFont]: isActivePath
                });
                
                return (
                    <NavLink
                        to={pathname}
                        className={activePro + classes.item}
                        activeClassName="active"
                        key={key}
                    >
                        <ListItem 
                            button 
                            className={classes.itemLink + listItemClasses}
                        >
                            {typeof route.icon === "string" ? (
                                <Icon
                                    className={classNames(
                                        classes.itemIcon, 
                                        whiteFontClasses, 
                                        { [classes.itemIconRTL]: props.rtlActive }
                                    )}
                                >
                                    {route.icon}
                                </Icon>
                            ):(
                                <route.icon
                                    className={classNames(
                                        classes.itemIcon, 
                                        whiteFontClasses, 
                                        { [classes.itemIconRTL]: props.rtlActive }
                                    )}
                                />
                            )}
                            <ListItemText
                                disableTypography={true}
                                primary={props.rtlActive ? route.rtlName : route.name}
                                className={classNames(
                                    classes.itemText, 
                                    whiteFontClasses, 
                                    { [classes.itemTextRTL]: props.rtlActive }
                                )}
                            />
                        </ListItem>
                    </NavLink>
                );
            })}
        </List>
    );

    return (<div>

        <Hidden mdUp implementation="css">
            <Drawer
                variant="temporary"
                anchor={props.rtlActive ? "left" : "right"}
                open={props.open}
                classes={{
                    paper: classNames(classes.drawerPaper, {
                        [classes.drawerPaperRTL]: props.rtlActive
                    })
                }}
                onClose={props.handleDrawerToggle}
                ModalProps={{
                    keepMounted: true // Better open performance on mobile.
                }}
            >
                <TopBrand {...props} classes={classes} />
                <div className={classes.sidebarWrapper}>
                    {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
                    {links}
                </div>
                {image !== undefined ? (
                    <div
                        className={classes.background}
                        style={{ backgroundImage: "url(" + image + ")" }}
                    />
                ) : null}
            </Drawer>
        </Hidden>

        <Hidden smDown implementation="css">
            <Drawer
                anchor={props.rtlActive ? "right" : "left"}
                variant="permanent"
                open
                classes={{
                    paper: classNames(classes.drawerPaper, {
                        [classes.drawerPaperRTL]: props.rtlActive
                    })
                }}
            >
                <TopBrand {...props} classes={classes} />
                <div className={classes.sidebarWrapper}>
                    {links}
                </div>
                {image !== undefined ? (
                    <div
                        className={classes.background}
                        style={{ backgroundImage: "url(" + image + ")" }}
                    />
                ) : null}
            </Drawer>
        </Hidden>
    </div>);
}

Sidebar.propTypes = {
    rtlActive: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    color: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
    image: PropTypes.string,
    //logo: PropTypes.string,
    //logoText: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
    open: PropTypes.bool
};
