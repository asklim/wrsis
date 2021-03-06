const debug = require( "debug" )( 'view:INVOICE' );

import React from "react";
//import PropTypes from "prop-types";
import { 
    Switch, 
    Route, 
    Redirect,
    useLocation,
    useRouteMatch,
} from "react-router-dom";

// creates a beautiful scrollbar
//import PerfectScrollbar from "perfect-scrollbar";
//import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import FixedPlugin from "components/m-d-r/FixedPlugin/FixedPlugin.js";

import Navbar from "components/wrsis/Navbars/Navbar.js";
import Footer from "components/wrsis/Footer/Footer.js";
import Sidebar from "components/wrsis/Sidebar/Sidebar.js";

import Whoops404 from "views/Whoops404.js";
import routes from "./InvoiceRoutes.js";

import styles from "assets/jss/m-d-r/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png"; // must be an image

//let ps;

const switchRoutes = (
    <Switch>
        {routes
        .map( (prop, index) => {
            if( prop.layout === "/invoice" ) {
                return (
                    <Route 
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={index}
                    />
                );
            }            
            return null;
        })
        .filter( Boolean )}
        
        <Redirect exact from="/invoice" to="/invoice/procurement" />
        <Route>
            <Whoops404 callFrom="Invoice layout" />
        </Route> 
    </Switch>
);

debug( 'init layout' );
const useStyles = makeStyles( styles );


export default function InvoiceBoard ({ ...props }) {

    // styles
    const classes = useStyles();
    debug( 'layout`s props:', Object.keys( props ), props );

    const routeMatch = useRouteMatch();
    debug( 'useRouteMatch:', routeMatch );
    const viewLocation = useLocation();    
    debug( 'useLocation:', viewLocation );

    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.useRef( null );
    debug( 'mainPanel ref:', mainPanel );

    // states and functions
    const [ image, setImage ] = React.useState( bgImage );
    const [ color, setColor ] = React.useState( "blue" );
    const [ fixedClasses, setFixedClasses ] = React.useState( "dropdown" );
    const [ mobileOpen, setMobileOpen ] = React.useState( false );
    //hasImage: true

    const handleImageClick = image => setImage( image );

    const handleColorClick = color => setColor( color );

    const handleFixedClick = () => ( fixedClasses === "dropdown" 
        ? setFixedClasses( "dropdown show" )
        : setFixedClasses( "dropdown" )
    );

    const handleDrawerToggle = () => setMobileOpen( !mobileOpen );

    const resizeFunction = () => {
        if( window.innerWidth >= 960 ) { setMobileOpen( false ); }
    };

    // initialize and destroy the PerfectScrollbar plugin
    React.useEffect( () => {

        /*if( navigator.platform.indexOf( "Win" ) > -1) {
            ps = new PerfectScrollbar( mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = "hidden";
        }*/

        window.addEventListener( "resize", resizeFunction );
        
        // Specify how to clean up after this effect:
        return function cleanup() {
            /*if( navigator.platform.indexOf( "Win" ) > -1) {
                ps.destroy();
            }*/
            window.removeEventListener( "resize", resizeFunction );
        };  
    }, [ mainPanel ]);


    return (<div className ={classes.wrapper}>

        <Sidebar
            routes ={routes}
            logoText ={"Invoice Board"}
            logo ={logo}
            image ={image}
            handleDrawerToggle ={handleDrawerToggle}
            open ={mobileOpen}
            color ={color}
            {...props}
        />

        {/* eslint-disable-next-line react/no-string-refs */}
        <div className ={classes.mainPanel} ref ={mainPanel}>
            <Navbar
                routes ={routes}
                handleDrawerToggle ={handleDrawerToggle}
                {...props}
            />

            <div className ={classes.content}>
                <div className ={classes.container}>
                    {switchRoutes}
                </div>
            </div>
        
            <Footer 
                appVersion ={window.document.wrsis.appVersion}
            />
            
            <FixedPlugin
                handleImageClick ={handleImageClick}
                handleColorClick ={handleColorClick}
                bgColor ={color}
                bgImage ={image}
                handleFixedClick ={handleFixedClick}
                fixedClasses ={fixedClasses}
            />
        </div>
    </div>);
}
