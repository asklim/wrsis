import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const style = {
  grid: {
    margin: "0 -15px !important",
    width: "unset"
  }
};

function GridContainer(props) 
{
  // eslint-disable-next-line react/prop-types
  const { classes, children, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  classes : PropTypes.object,
  //children : PropTypes.node,
};

export default withStyles(style)(GridContainer);
