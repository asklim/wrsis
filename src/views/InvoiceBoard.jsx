import React from "react";
import PropTypes from "prop-types";

// react plugin for creating charts
//import ChartistGraph from "react-chartist";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
//import Icon from "@material-ui/core/Icon";

// @material-ui/icons
/*import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
*/
import SmallPeriod from "@material-ui/icons/Battery20";
import MediumPeriod from "@material-ui/icons/Battery50";
import LargePeriod from "@material-ui/icons/Battery80";
//import XtraLargePeriod from "@material-ui/icons/BatteryFull";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
/*
import Table from "components/Table/Table.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
*/

import { bugs, website, server } from "variables/general.jsx";

import dashboardStyle from "assets/jss/views/dashboardStyle.jsx";

class InvoiceBoardPage extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    //const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={10} md={8} lg={6}>
            <CustomTabs
              title="Заказ на:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "12 дней",
                  tabIcon: SmallPeriod,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  )
                },
                {
                  tabName: "24 дня",
                  tabIcon: MediumPeriod,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  )
                },
                {
                  tabName: "36 дней",
                  tabIcon: LargePeriod,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  )
                }
              ]}
            />
          </GridItem>
          
        </GridContainer>
      </div>
    );
  }
}

InvoiceBoardPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(InvoiceBoardPage);
