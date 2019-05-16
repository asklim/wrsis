/* eslint-disable react/prop-types */

import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";

// @material-ui/icons
import Menu from "@material-ui/icons/Menu";

// core components
import AdminNavbarLinks from "./AdminNavbarLinks.jsx";
import RTLNavbarLinks from "./RTLNavbarLinks.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerStyle from "assets/jss/material-dashboard-react/components/headerStyle.jsx";

function Header({ ...props }) 
{
  function makePageBrand() 
  {
    let name;
    // eslint-disable-next-line no-unused-vars
    props.routes.map((prop, key) => {
      if (prop.layout + prop.path === props.location.pathname) {
        name = props.rtlActive ? prop.rtlName : prop.name;
      }
      return null;
    });
    return name || 'Error 404';
  }

  const { classes, color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });

  const titleTail = document.title.split(" - ")[1] || document.title;
  const pageName = makePageBrand();
  document.title = pageName + " - " + titleTail;

  return (
    <AppBar className={classes.appBar + appBarClasses}>

      {/*console.log('Header props : ', props)*/}

      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href="#" className={classes.title}>
            {pageName}
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
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withStyles(headerStyle)(Header);
