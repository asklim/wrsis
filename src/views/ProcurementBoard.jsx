import React from "react";
import PropTypes from "prop-types";


// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
//import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import { 
  Battery20 as ShortPeriod,
  Battery50 as MiddlePeriod,
  Battery80 as LongPeriod,
  BatteryFull as XtraLongPeriod,
  AddAlert,
} from "@material-ui/icons";
/*import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
*/


// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
//import Tasks from "components/Tasks/Tasks.jsx";


/*
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
*/

import dashboardStyle from "assets/jss/views/dashboardStyle.jsx";
import {
  procurementPeriods as days
} from "config/enumvalues";



class ProcurementBoardPage extends React.Component {
  state = {
    filterByFreq : "last",
    filterByFrom : "RU",
    isLoaded : false,
    serverDataset : [],  // Array of Hash /server/sample-datasets/procurements.js
    shortPeriod : [],    // Array of Array
    middlePeriod : [],
    longPeriod : [],
    xtraLongPeriod : [],    
  };
  
  freqValues = ["last","avrg","max"];
 
  tableHeader = ( period ) => {
    const lineCount = {
      sp : this.state.shortPeriod.length,
      mp : this.state.middlePeriod.length,
      lp : this.state.longPeriod.length,
      xlp : this.state.xtraLongPeriod.length,
    };
    return [
      "#", "La", "Av", "Mx", `Название (${lineCount[period]})`
    ];    
  };
  handleFilterByFreqChange = event => {
    const freq = event.target.value;
    //console.log("filter Freq: ", freq );
    this.setState({ filterByFreq : freq });
    this.updateViewingLists( freq );
  };
  /*
  formatValue = ( out, curr ) => {
    return out + '   ' + curr.toString();
  }
  formatUnits = (needUnits) => {
    return needUnits.reduce(this.formatValue, '');     
  } */

  // eslint-disable-next-line no-unused-vars
  serverDatasetFilter = ( period, freq, from ) => {
    return ( item => item[period][freq] > 0 );
  };

  convertToViewList = ( state, period ) => 
  {
    const freqId = this.freqValues.indexOf( state.filterByFreq ); // 0|1|2
    const filtering = this.serverDatasetFilter( 
      period, freqId, state.filterByFrom 
    );
    const hashs = state.serverDataset;    
    const viewList = hashs
      .filter( filtering ) // item => item[period][freqId] > 0 ) 
      .map( (item, key) => {
        return [ 
          (key+1).toString(),  
          item[period][0].toString(), // last 
          item[period][1].toString(), // average 
          item[period][2].toString(), // max
          item.name
        ];
      });
    //console.log("convertToView : ", freqId, hashs.length, viewList.length ); 
    const p = Promise.resolve(viewList); 
    //console.log("convertToView : ", p);
    return p;
  }

  updateViewingLists = (freq) => {  
    //console.log("updateViewLists this.state ",this.state);
    const { state : oldState } = this; 
    oldState.filterByFreq = freq;    
    //console.log("updateViewLists oldState ", oldState);
    Promise.all([
      this.convertToViewList( oldState, 'sp' ),
      this.convertToViewList( oldState, 'mp' ),
      this.convertToViewList( oldState, 'lp' ),
      this.convertToViewList( oldState, 'xlp' )
    ])
    .then( lists => {
//console.log("updateViewLists ", lists.map( item => item.length ));      
      this.setState({ 
        shortPeriod : lists[0],
        middlePeriod : lists[1],
        longPeriod : lists[2],
        xtraLongPeriod : lists[3],          
      });
    });
  };

  fetchLists = () => {    
    let route = window.location.origin;
    route += '/api/sum/procurement/last';
    //console.log('fetch Lists: ', route);    
    fetch(route,{
      cache : 'no-cache'
    })
    .then( response => response.json())  // '[{}, ..., {}]'      
    .then( hashs => {
console.log('fetch Lists Length: ', hashs.length);
      this.setState({ 
        serverDataset : hashs,
        isLoaded : true,
      });    
    })
    .then( () => {
      //console.log("Update ViewLists after fetch from server.");
      //console.log(this.state);
      this.updateViewingLists( 'last' );
    })
    .catch(err => {
      this.setState({ isLoaded : false });
      console.log(err); 
    });    
  };
  componentDidMount = () => this.fetchLists();

  render() 
  {
    const { classes } = this.props;
    const { isLoaded, ...rest } = this.state;
    //console.log('state: ', this.state);

    return !isLoaded ?
    (
      <GridContainer>
        <GridItem xs={12} sm={12} md={8} lg={4}>
        <SnackbarContent
          message = {'Loading ...'}
          color="info"
          icon={AddAlert}
        />
        </GridItem>
      </GridContainer>
    ):(
      <div>
      <GridContainer>
        <GridItem xs={12} sm={10} md={8} lg={6}> 
          <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">По продажам</FormLabel>
          <RadioGroup
            aria-label="SelectOnFreq"
            name="FilterByFreq"
            className={classes.group}
            value={this.state.filterByFreq}
            onChange={this.handleFilterByFreqChange}
          >
            <FormControlLabel 
              value={this.freqValues[0]} 
              control={<Radio />} 
              label="Last"
            />
            <FormControlLabel 
              value={this.freqValues[1]}  
              control={<Radio />} 
              label="Средние" 
            />
            <FormControlLabel 
              value={this.freqValues[2]}  
              control={<Radio />} 
              label="Maximal" 
            />
          </RadioGroup>
          </FormControl>       
        </GridItem>
      </GridContainer>
      <GridContainer>  
        <GridItem xs={12} sm={10} md={8} lg={6}>
          <CustomTabs
            title="Заказ на:"
            headerColor="primary"
            tabs={[
              {
                tabName: `${days.short} дней`,
                tabIcon: ShortPeriod,
                tabContent: (
                  <Table
                    tableHeaderColor="danger"
                    tableHead={this.tableHeader('sp')}
                    tableData={rest.shortPeriod}
                  />
                )
              },
              {
                tabName: `${days.middle} дня`,
                tabIcon: MiddlePeriod,
                tabContent: (
                  <Table
                    tableHeaderColor="warning"
                    tableHead={this.tableHeader('mp')}
                    tableData={rest.middlePeriod}
                  />
                )
              },
              {
                tabName: `${days.long} дней`,
                tabIcon: LongPeriod,
                tabContent: (
                  <Table
                    tableHeaderColor="primary"
                    tableHead={this.tableHeader('lp')}
                    tableData={rest.longPeriod}
                  />
                )
              },
              {
                tabName: `${days.xtraLong} дней`,
                tabIcon: XtraLongPeriod,
                tabContent: (
                  <Table
                    tableHeaderColor="info"
                    tableHead={this.tableHeader('xlp')}
                    tableData={rest.xtraLongPeriod}
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
