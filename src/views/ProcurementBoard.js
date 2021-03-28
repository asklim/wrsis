var debug = require( 'debug' )( 'front:views:invoice' );

import React, {
    useState,
    useEffect,
    // useCallback,
} from "react";
//import PropTypes from "prop-types";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { 
    Checkbox,
    Radio, 
    RadioGroup,
    FormControlLabel, 
    FormControl,
    FormLabel,
    FormGroup,
    //Icon,
} from '@material-ui/core';

// @material-ui/icons
import { 
    Battery20 as ShortPeriod,
    Battery50 as MiddlePeriod,
    Battery80 as LongPeriod,
    BatteryFull as XtraLongPeriod,
    //AddAlert,
    Check,
    //Store, Warning, DateRange, LocalOffer,
    //Update, ArrowUpward, AccessTime,  Accessibility
} from "@material-ui/icons";

// core components
import GridItem from "components/m-d-r/Grid/GridItem.js";
import GridContainer from "components/m-d-r/Grid/GridContainer.js";
import Table from "components/m-d-r/Table/Table.js";
import CustomTabs from "components/m-d-r/CustomTabs/CustomTabs.js";
//import SnackbarContent from "components/m-d-r/Snackbar/SnackbarContent.js";
//import Tasks from "components/m-d-r/Tasks/Tasks.js";
/*
import Danger from "components/m-d-r/Typography/Danger.js";
import Card from "components/m-d-r/Card/Card.js";
import CardHeader from "components/m-d-r/Card/CardHeader.js";
import CardIcon from "components/m-d-r/Card/CardIcon.js";
import CardBody from "components/m-d-r/Card/CardBody.js";
import CardFooter from "components/m-d-r/Card/CardFooter.js";
*/

import Loading from "components/misc/Loading.js";
import DataLoadError from "components/misc/DataLoadError.js";

import {
    procurementPeriods as days,
} from '../config/enum-values.js';

import dashboardStyle from "assets/jss/m-d-r/views/dashboardStyle.js";
import checkboxAdnRadioStyle from "assets/jss/m-d-r/checkboxAdnRadioStyle.js";

const useStyles = makeStyles({
    ...dashboardStyle,
    ...checkboxAdnRadioStyle,
});


export default function ProcurementBoardPage() {
  
    const freqValues = [ 'last', 'avrg', 'max' ];
    const fromValues = [ 'ru', 'by', 'eu' ];

    const [ filterByFreq, setFilterByFreq ] = useState( freqValues[0] );
    const [ filterByFrom, setFilterByFrom ] = useState( fromValues );
    const [ isLoaded, setIsLoaded ] = useState( false );
    const [ isDataLoadingError, setIsDataLoadingError ] = useState( false );
    const [ serverDataset, setServerDataset ] = useState( [] );        // Array of Hash 
    //  /server/sample-datasets/procurements.js
    // Viewing lists for Table
    const [ shortPeriod, setShortPeriod ] = useState( [] );  // Array of Array
    const [ middlePeriod, setMiddlePeriod ] = useState( [] );
    const [ longPeriod, setLongPeriod ] = useState( [] );
    const [ xtraLongPeriod, setXtraLongPeriod ] = useState( [] );

    const [ dataServerResponse, setDataServerResponse ] = useState( {} );


    const tableHeader = (period) => {
        
        const lineCount = {
            sp: shortPeriod.length,
            mp: middlePeriod.length,
            lp: longPeriod.length,
            xlp: xtraLongPeriod.length,
        };
        return [
            '#', 'La', 'Av', 'Mx', `Название (${lineCount[ period ]})`
        ];    
    };


    const handleFilterByFreqChange = (event /*, value*/) => {
        const freq = event.target.value;
        //console.log("filter Freq: ", freq, value ); // is Equal
        updateViewingLists( freq, null );    
        setFilterByFreq( freq );
    };


    const handleFromFilterClick = (from) => 
        (/*event,oldValue?*/) => {
            const currentIndex = filterByFrom.indexOf( from );
            const newChecked = [ ...filterByFrom ];

            if( currentIndex === -1 ) {
                newChecked.push( from );
            } else {
                newChecked.splice( currentIndex, 1 );
            }
            updateViewingLists( null, newChecked );
            setFilterByFrom( newChecked );
            //console.log('FromFilter Click:', newChecked);
        };
    
    //formatValue = (out, curr) => out + '   ' + curr.toString();
    //formatUnits = (needUnits) => needUnits.reduce(this.formatValue, '');


    const isFromIntersected = (item, fromFilter) => { 
        const itemFroms = item.from
        .split( ',' )
        .map( (x) => x.toLowerCase() );
        //console.log('isIntersected : ', itemFroms);
        const result = fromFilter
        .filter( (x) => itemFroms.includes( x ));
        
        return result.length !== 0;
    };
  

    const serverDatasetFilter = (period, freqId, fromFilter) => {
        return ( 
            (item) => 
                item[ period ][ freqId ] > 0 
                && isFromIntersected( item, fromFilter )
        );
    };


    const convertToViewList = (period, freq, from) => {

        const freqId = freqValues.indexOf( freq ); // 0|1|2
        const filtering = serverDatasetFilter( period, freqId, from );  
        
        const viewList = serverDataset
        .filter( filtering ) // item => item[period][freqId] > 0 ) 
        .map( (item, key) => {
            return [ 
                ( key+1 ).toString(),  
                item[ period ][0].toString(), // last 
                item[ period ][1].toString(), // average 
                item[ period ][2].toString(), // max
                item.name
            ];
        });
        //console.log("convertToView : ", freqId, hashs.length, viewList.length ); 
        const p = Promise.resolve( viewList ); 
        //console.log( "convertToView : ", p );
        return p;
    };


    const updateViewingLists = (freq, from) => {

        //console.log("updateViewLists freq, from ", freq, from);
        if( !freq ) { freq = filterByFreq; }
        if( !from ) { from = filterByFrom; } 
        //console.log("updateViewLists oldState ", oldState);
        Promise.all([
            convertToViewList( 'sp', freq, from ),
            convertToViewList( 'mp', freq, from ),
            convertToViewList( 'lp', freq, from ),
            convertToViewList('xlp', freq, from )
        ])
        .then( (lists) => {     
            setShortPeriod( lists[0] );
            setMiddlePeriod( lists[1] );
            setLongPeriod( lists[2] );
            setXtraLongPeriod( lists[3] );
            //console.log( "updateViewLists ", lists.map( item => item.length ));       
        });
    };


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchLists = () => {    
        
        let route;
        
        console.log( 'fetchLists .origin: ', window.location.origin ); 
        route = window.location.origin;  
        route += '/api/sum/procurement/last';
        console.log( 'fetchLists route: ', route ); 
        debug( 'fetchLists route: %s', route );  
        
        let headers = {
            mode: "cors",
            credentials: "omit",
            "Content-Type" : "application/json",
            "Cache-Control" : 'no-cache, no-store',
            charset : "utf-8"
        };
        fetch( route, headers )
        .then( (response) => {
            if( !response.ok ) {
                setDataServerResponse( response );
                setIsDataLoadingError( true );
                console.log( 'fetch is not ok', response );
                throw new Error( 'Ответ сети был не ok.' );
            }
            return response.json();    
        })  // '[{}, ..., {}]'      
        .then( (hashs) => {
            //console.log('fetch Lists hash Length: ', hashs.length); //is Ok: 444
            //return Promise.resolve( 
            setServerDataset( hashs );
            //console.log(filterByFreq, filterByFrom);      
            setIsLoaded( true );      
            setIsDataLoadingError( false );
        }) 
        .catch( (err) => {
            setIsLoaded( false );
            setIsDataLoadingError( true );
            console.log('ProcBoard.fetch catch ', err ); 
            debug( 'fetch is catch.' );
        });    
    };

    //Эффект применяется после рендеринга и только 1 раз
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( () => fetchLists(), []);

    useEffect( () => {
        updateViewingLists( filterByFreq, filterByFrom );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ serverDataset ] );
  
    const isFilterByFromChecked = (index) => filterByFrom.includes( fromValues[ index ] );

    const classes = useStyles();       
    
    if( isDataLoadingError ) {
        return (
            <DataLoadError fetchapiResponse = {dataServerResponse}/>
        );
    }
    if( !isLoaded ) { return <Loading/>; }

    return (
        <div>
            <GridContainer>
                <GridItem xs={5} sm={4} md={3} lg={2}> 
                    <FormControl component = "fieldset" className = {classes.formControl}>
                        <FormLabel component = "legend">По продажам</FormLabel>
                        <RadioGroup
                            aria-label = "SelectOnFreq"
                            name = "FilterByFreq"
                            className = {classes.group}
                            value = {filterByFreq}
                            onChange = {handleFilterByFreqChange}
                        >
                            <FormControlLabel 
                                value = {freqValues[0]} 
                                control = {<Radio />} 
                                label = "Last"
                            />
                            <FormControlLabel 
                                value = {freqValues[1]}  
                                control = {<Radio />} 
                                label = "Средние" 
                            />
                            <FormControlLabel 
                                value = {freqValues[2]}  
                                control = {<Radio />} 
                                label = "Maximal" 
                            />
                        </RadioGroup>
                    </FormControl>       
                </GridItem>
                <GridItem xs={5} sm={4} md={3} lg={2}> 
                    <FormControl component = "fieldset" className = {classes.formControl}>
                        <FormLabel component = "legend">Откуда</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control = {
                                    <Checkbox
                                        checked = {isFilterByFromChecked(0)}
                                        tabIndex = {-1}
                                        onClick = {handleFromFilterClick( fromValues[0] )}
                                        checkedIcon = {<Check className = {classes.checkedIcon}/>}
                                        icon = {<Check className = {classes.uncheckedIcon}/>}
                                        classes = {{ checked: classes.checked }}
                                    />
                                }
                                label="RU"
                            />
                            <FormControlLabel
                                control = {
                                    <Checkbox
                                        checked = {isFilterByFromChecked(1)}
                                        tabIndex = {-1}
                                        onClick = {handleFromFilterClick( fromValues[1] )}
                                        checkedIcon = {<Check className={classes.checkedIcon}/>}
                                        icon = {<Check className={classes.uncheckedIcon}/>}
                                        classes = {{ checked: classes.checked }}
                                    />
                                }
                                label = "BY"
                            />
                            <FormControlLabel
                                control = {
                                    <Checkbox
                                        checked = {isFilterByFromChecked(2)}
                                        tabIndex = {-1}
                                        onClick = {handleFromFilterClick( fromValues[2] )}
                                        checkedIcon = {<Check className={classes.checkedIcon}/>}
                                        icon = {<Check className={classes.uncheckedIcon}/>}
                                        classes = {{ checked: classes.checked }}
                                    />
                                }
                                label="EU"
                            />            
                        </FormGroup>
                    </FormControl>    
                </GridItem>
            </GridContainer>


            <GridContainer>  
                <GridItem xs={12} sm={10} md={8} lg={6}>
                    <CustomTabs
                        title = "Заказ на:"
                        headerColor = "primary"
                        tabs = {[
                            {
                                tabName: `${days.short} дней`,
                                tabIcon: ShortPeriod,
                                tabContent: (
                                    <Table
                                        tableHeaderColor = "danger"
                                        tableHead = {tableHeader('sp')}
                                        tableData = {shortPeriod}
                                    />
                                )
                            },
                            {
                                tabName: `${days.middle} дня`,
                                tabIcon: MiddlePeriod,
                                tabContent: (
                                    <Table
                                        tableHeaderColor = "warning"
                                        tableHead = {tableHeader('mp')}
                                        tableData = {middlePeriod}
                                    />
                                )
                            },
                            {
                                tabName: `${days.long} дней`,
                                tabIcon: LongPeriod,
                                tabContent: (
                                    <Table
                                        tableHeaderColor = "primary"
                                        tableHead = {tableHeader('lp')}
                                        tableData = {longPeriod}
                                    />
                                )
                            },
                            {
                                tabName: `${days.xtraLong} дней`,
                                tabIcon: XtraLongPeriod,
                                tabContent: (
                                    <Table
                                        tableHeaderColor = "info"
                                        tableHead = {tableHeader('xlp')}
                                        tableData = {xtraLongPeriod}
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
