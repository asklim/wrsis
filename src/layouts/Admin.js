const debug = require( "debug" )( 'view:ADMIN' );

import React from "react";
import { 
    Switch, 
    Route, 
    Redirect,
    useParams,
    useRouteMatch,
    useLocation,
} from "react-router-dom";

// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import FixedPlugin from "components/m-d-r/FixedPlugin/FixedPlugin.js";

import Navbar from "components/wrsis/Navbars/Navbar.js";
import Footer from "components/wrsis/Footer/Footer.js";
import Sidebar from "components/wrsis/Sidebar/Sidebar.js";

import Whoops404 from "views/Whoops404.js";
import routes from "./AdminRoutes.js";

import styles from "assets/jss/m-d-r/layouts/adminStyle.js";
import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

let ps;


const SwitchRoutes = () => {

    const { viewId } = useParams();
        
    return (
        <Switch>
            {routes
            .map( (route, index) => {
                if( route.layout === "/admin" ) {
                    return (
                        <Route
                            path={route.layout + route.path}
                            component={route.component}
                            key={index}
                        />
                    );
                }          
                return null;
            })
            .filter( Boolean )}

            <Redirect exact from="/" to="/admin/dashboard" />
            <Redirect exact from="/admin" to="/admin/dashboard" />
            <Route
                key={404}
            >
                <Whoops404 callFrom={`Admin layout / View: ${viewId}`} />            
            </Route> 
        </Switch>
    );
};

debug( 'init layout' );
const useStyles = makeStyles( styles );


export default function Admin({ ...props }) {

    const MOBILE_OPEN_WIDTH = 960;
    // styles
    const classes = useStyles();
    debug( 'layout`s props:', Object.keys( props ), props );

    const routeMatch = useRouteMatch();
    const adminLocation = useLocation();
    debug( 'useRouteMatch:', routeMatch );
    debug( 'useLocation:', adminLocation );

    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef();
    debug( 'mainPanel ref:', mainPanel );

    // states and functions
    const [ image, setImage ] = React.useState( bgImage );
    const [ color, setColor ] = React.useState( "blue" );
    const [ fixedClasses, setFixedClasses ] = React.useState( "dropdown" );
    const [ mobileOpen, setMobileOpen ] = React.useState( false );

    const handleImageClick = (image) => setImage( image );

    const handleColorClick = (color) => setColor( color );

    const handleFixedClick = () => {
        setFixedClasses( fixedClasses === "dropdown"
            ? "dropdown show"
            : "dropdown"
        );
    };

    const handleDrawerToggle = () => setMobileOpen( !mobileOpen );

    const resizeFunction = () => {
        if (window.innerWidth >= MOBILE_OPEN_WIDTH) {
            setMobileOpen( false );
        }
    };

    // initialize and destroy the PerfectScrollbar plugin
    React.useEffect( () => {

        if( navigator.platform.includes( "Win" )) {
            ps = new PerfectScrollbar( mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = "hidden";
        }
        window.addEventListener( "resize", resizeFunction );
        // Specify how to clean up after this effect:
        return function cleanup() {
            if( navigator.platform.includes( "Win" )) {
                ps.destroy();
            }
            window.removeEventListener( "resize", resizeFunction );
        };
    }, [mainPanel]);


    return (
        <div className={classes.wrapper}>
            <Sidebar
                routes={routes}
                logoText={"Creative AsKlim"}
                logo={logo}
                image={image}
                handleDrawerToggle={handleDrawerToggle}
                open={mobileOpen}
                color={color}
                {...props}
            />
            <div className={classes.mainPanel} ref={mainPanel}>
                <Navbar
                    routes={routes}
                    handleDrawerToggle={handleDrawerToggle}
                    {...props}
                />

                <div className={classes.content}>
                    <div className={classes.container}>
                        <SwitchRoutes />
                    </div>
                </div>
        
                <Footer 
                    appVersion ={window.document.wrsis.appVersion}
                /> 
                
                <FixedPlugin
                    handleImageClick={handleImageClick}
                    handleColorClick={handleColorClick}
                    bgColor={color}
                    bgImage={image}
                    handleFixedClick={handleFixedClick}
                    fixedClasses={fixedClasses}
                />
            </div>
        </div>
    );
}
