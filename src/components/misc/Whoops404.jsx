import React from "react";
import PropTypes from 'prop-types';

// core components
import GridItem from "components/m-d-r/Grid/GridItem.jsx";
import GridContainer from "components/m-d-r/Grid/GridContainer.jsx";
import SnackbarContent from "components/m-d-r/Snackbar/SnackbarContent.jsx";

// @material-ui/icons
import { MoodBad as WhoopsIcon } from "@material-ui/icons";

const Whoops404 = ({ location }) => 
{
  //const { classes } = props;
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
      </GridItem>
    </GridContainer>
  );
};
Whoops404.propTypes = {
  location: PropTypes.object
};

export default Whoops404;