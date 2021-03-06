//const debug = require( "debug")( 'component:MainDashboard' );

import React from "react";

// react plugin for creating charts
import ChartistGraph from "react-chartist";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
//import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import { 
    FileCopy,
    Store,
    Warning,
    DateRange, 
    LocalOffer ,
    Update,
    ArrowUpward,
    AccessTime,
    Accessibility,
    BugReport,
    Code,
    Info,
    Cloud 
} from "@material-ui/icons";

// core components
import GridItem from "components/m-d-r/Grid/GridItem.js";
import GridContainer from "components/m-d-r/Grid/GridContainer.js";
import Table from "components/m-d-r/Table/Table.js";
import Tasks from "components/m-d-r/Tasks/Tasks.js";
import CustomTabs from "components/m-d-r/CustomTabs/CustomTabs.js";
import Danger from "components/m-d-r/Typography/Danger.js";

//import * as m from "components/m-d-r/Card/index.mjs";
//debug( m );

import { 
    Card, 
    CardBody,
    CardHeader, 
    CardFooter, 
    CardIcon, 
} from "components/m-d-r/Card/index.mjs";

import { bugs, website, server } from "variables/general.js";

import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/m-d-r/views/dashboardStyle.js";

const useStyles = makeStyles( styles );


export default function MainDashboard() {

    const classes = useStyles();
    //debug('main Dashboard, Admin layout.');

    return (<div>
        <GridContainer>
            <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="warning" stats icon>
                        <CardIcon color="warning">
                            {/*<Icon>content_copy</Icon>*/}
                            <FileCopy />
                        </CardIcon>
                        <p className={classes.cardCategory}>Used Space</p>
                        <h3 className={classes.cardTitle}>
                                49/50 <small>GB</small>
                        </h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <Danger>
                                <Warning />
                            </Danger>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                    Get more space
                            </a>
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="success" stats icon>
                        <CardIcon color="success">
                            <Store />
                        </CardIcon>
                        <p className={classes.cardCategory}>Revenue</p>
                        <h3 className={classes.cardTitle}>$34,245</h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <DateRange />
                                Last 24 Hours
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="danger" stats icon>
                        <CardIcon color="danger">
                            {/*<Icon>info_outline</Icon>*/}
                            <Info style={{ fontSize: 40 }} />
                        </CardIcon>
                        <p className={classes.cardCategory}>Fixed Issues</p>
                        <h3 className={classes.cardTitle}>75</h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <LocalOffer />
                                Tracked from Github
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <Card>
                    <CardHeader color="info" stats icon>
                        <CardIcon color="info">
                            <Accessibility />
                        </CardIcon>
                        <p className={classes.cardCategory}>Followers</p>
                        <h3 className={classes.cardTitle}>+245</h3>
                    </CardHeader>
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <Update />
                                Just Updated
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>

        <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                    <CardHeader color="success">
                        <ChartistGraph
                            className="ct-chart"
                            data={dailySalesChart.data}
                            type="Line"
                            options={dailySalesChart.options}
                            listener={dailySalesChart.animation}
                        />
                    </CardHeader>
                    <CardBody>
                        <h4 className={classes.cardTitle}>Daily Sales</h4>
                        <p className={classes.cardCategory}>
                            <span className={classes.successText}>
                                <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                            </span>{" "}
                                increase in today sales.
                        </p>
                    </CardBody>
                    <CardFooter chart>
                        <div className={classes.stats}>
                            <AccessTime /> updated 4 minutes ago
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                    <CardHeader color="warning">
                        <ChartistGraph
                            className="ct-chart"
                            data={emailsSubscriptionChart.data}
                            type="Bar"
                            options={emailsSubscriptionChart.options}
                            responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                            listener={emailsSubscriptionChart.animation}
                        />
                    </CardHeader>
                    <CardBody>
                        <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                        <p className={classes.cardCategory}>Last Campaign Performance</p>
                    </CardBody>
                    <CardFooter chart>
                        <div className={classes.stats}>
                            <AccessTime /> campaign sent 2 days ago
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                    <CardHeader color="danger">
                        <ChartistGraph
                            className="ct-chart"
                            data={completedTasksChart.data}
                            type="Line"
                            options={completedTasksChart.options}
                            listener={completedTasksChart.animation}
                        />
                    </CardHeader>
                    <CardBody>
                        <h4 className={classes.cardTitle}>Completed Tasks</h4>
                        <p className={classes.cardCategory}>Last Campaign Performance</p>
                    </CardBody>
                    <CardFooter chart>
                        <div className={classes.stats}>
                            <AccessTime /> campaign sent 2 days ago
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>

        <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
                <CustomTabs
                    title="Tasks:"
                    headerColor="primary"
                    tabs={[
                        {
                            tabName: "Bugs",
                            tabIcon: BugReport,
                            tabContent: (
                                <Tasks
                                    checkedIndexes={[0, 3]}
                                    tasksIndexes={[0, 1, 2, 3]}
                                    tasks={bugs}
                                />
                            )
                        },
                        {
                            tabName: "Website",
                            tabIcon: Code,
                            tabContent: (
                                <Tasks
                                    checkedIndexes={[0]}
                                    tasksIndexes={[0, 1]}
                                    tasks={website}
                                />
                            )
                        },
                        {
                            tabName: "Server",
                            tabIcon: Cloud,
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

            <GridItem xs={12} sm={12} md={6} lg={6} xl={4}>
                <Card>
                    <CardHeader color="warning">
                        <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                        <p className={classes.cardCategoryWhite}>
                                New employees on 15th September, 2016
                        </p>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="warning"
                            tableHead={["ID", "Name", "Salary", "Country"]}
                            tableData={[
                                ["1", "Губаревич Сергей", "$8,738", "Belarus"],
                                ["2", "Морозов Артем", "$7,789", "Беларусь"],
                                ["3", "Колокольчикова Елена", "$6,142", "РБ"],
                                ["4", "Толстая Ольга", "$6,735", "RoB"]
                            ]}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    </div>);
}
