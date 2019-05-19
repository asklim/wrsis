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
import ShortPeriod from "@material-ui/icons/Battery20";
import MiddlePeriod from "@material-ui/icons/Battery50";
import LongPeriod from "@material-ui/icons/Battery80";
import XtraLongPeriod from "@material-ui/icons/BatteryFull";
import AddAlert from "@material-ui/icons/AddAlert";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
//import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

/*
import Table from "components/Table/Table.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
*/

//import { bugs, website, server } from "variables/general.jsx";

import dashboardStyle from "assets/jss/views/dashboardStyle.jsx";

class ProcurementBoardPage extends React.Component {
  state = {
    //value : 0,
    loading: false,
    shortPeriod : [],    // Array of Array
    middlePeriod : [],
    longPeriod : [],
    xtraLongPeriod : []
  };
  /*
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  */

  header = ["#", "La", "Av", "Mx", "Название"];

  componentDidMount = () => { this.fetchLists(); }
  /*
  formatValue = ( out, curr ) => {
    return out + '   ' + curr.toString();
  }
  formatUnits = (needUnits) => {
    return needUnits.reduce(this.formatValue, '');     
  } */

  convertDatasetToViewList = ( hashs, period ) => {
    return hashs
      .filter( item => item[period][2] > 0 )
      .map( (item, key) => {
        return [ 
          (key+1).toString(),  
          item[period][0].toString(), // last 
          item[period][1].toString(), // average 
          item[period][2].toString(), // max
          item.name
        ];
      });
  }

  fetchLists = () => {
    this.setState({loading: true});
    let route = window.location.origin;
    route += '/api/sum/procurements/last';
    //console.log('fetch Lists: ', route);    
    fetch(route)
      .then( response => response.json())  // '[{}, ..., {}]'      
      .then( hashs => {
        //console.log('fetch Lists: ', hashs);
        this.setState( {
          shortPeriod : this.convertDatasetToViewList( hashs, 'sp'),
          middlePeriod : this.convertDatasetToViewList( hashs, 'mp'),
          longPeriod : this.convertDatasetToViewList( hashs, 'lp'),
          xtraLongPeriod : this.convertDatasetToViewList( hashs, 'xlp'),
        });
        this.setState({loading: false}); 
      })
    .catch(err => {
      console.log(err); 
    });    
  };

  render() 
  {
    //const { classes } = this.props;
    const { loading, ...lists } = this.state;
    //console.log('fetch Lists: ', lists.shortPeriod);

    return loading === true
    ?(
      <GridContainer>
        <GridItem xs={12} sm={12} md={8} lg={4}>
        <SnackbarContent
          message = {'Loading ...'}
          color="info"
          icon={AddAlert}
        />
        </GridItem>
      </GridContainer>
     )
    :(
      <div>
        <GridContainer>
          <GridItem xs={12} sm={10} md={8} lg={6}>
            <CustomTabs
              title="Заказ на:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "12 дней",
                  tabIcon: ShortPeriod,
                  tabContent: (
                    <Table
                      tableHeaderColor="danger"
                      tableHead={this.header}
                      tableData={lists.shortPeriod}
                    />
                  )
                },
                {
                  tabName: "24 дня",
                  tabIcon: MiddlePeriod,
                  tabContent: (
                    <Table
                      tableHeaderColor="warning"
                      tableHead={this.header}
                      tableData={lists.middlePeriod}
                    />
                  )
                },
                {
                  tabName: "36 дней",
                  tabIcon: LongPeriod,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={this.header}
                      tableData={lists.longPeriod}
                    />
                  )
                },
                {
                  tabName: "96 дней",
                  tabIcon: XtraLongPeriod,
                  tabContent: (
                    <Table
                      tableHeaderColor="info"
                      tableHead={this.header}
                      tableData={lists.xtraLongPeriod}
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

ProcurementBoardPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(ProcurementBoardPage);
