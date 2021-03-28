import React from "react";
//import { createBrowserHistory } from "history";
import { 
    BrowserRouter,
    Route, 
    Switch, 
    Redirect 
} from "react-router-dom";

//import * as m from "layouts/index.mjs";
//console.log( m );

if( window.document.title.includes( 'dev-mode' )) {
    //title setted in <root>/config/webpack.config-factory.js
    //by htmlWebpackPlugin
    localStorage.setItem( 'debug', 'view:*, component:*' );
    //localStorage.setItem( 'rsismode', 'development' );
}
else {
    localStorage.removeItem( 'debug' );
}

// core layouts
//import layouts from "layouts/index.js";
import { 
    Admin,
    Invoice,
    RightToLeft,
    UISamples 
} from "layouts/index.mjs";

/*const {
    loadableAdmin: Admin,
    loadableInvoice: Invoice,
    loadableRTL: RightToLeft,
    loadableUISamples: UISamples 
} = layouts;*/

import Whoops404 from "views/Whoops404.js";

//const browserHistory = createBrowserHistory();

//console.log('running ReactApp');
export default function App () {
    return (
        <BrowserRouter
            keyLength={12}
        >
            <Switch> 
                {/*<Redirect exact from ="/" to ="/admin" />*/}
                {/*<Redirect from ="/admin" to ="/admin/dashboard" />*/}

                <Redirect from="/i" to="/invoice" />
                <Redirect from="/s" to="/uisamples" />

                <Route exact path="/">
                    <Admin />
                </Route>

                <Route exact path="/admin">
                    <Admin />
                </Route>

                <Route path="/admin/:viewId">
                    <Admin />
                </Route>

                <Route exact path="/invoice">
                    <Invoice />       
                </Route>

                <Route path="/invoice/:viewId">
                    <Invoice />       
                </Route> 

                <Route exact path="/uisamples">
                    <UISamples />
                </Route>     

                <Route path="/uisamples/:viewId">
                    <UISamples />
                </Route>

                <Route path="/rtl/rtl-page">
                    <RightToLeft />
                </Route>
                                
                <Route path="*">
                    <Whoops404 callFrom="App.js" />
                </Route> 

            </Switch>
        </BrowserRouter>
    );
}
