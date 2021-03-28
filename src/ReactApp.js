import React from "react";
import ReactDOM from "react-dom";
import HotApp from 'components/wrsis/App/index.js';


const element = document.getElementById( "react-app" );
window.document.wrsis = { appVersion: element.innerHTML };
console.log( 'wrsis.appVersion =', window.document.wrsis.appVersion );

ReactDOM.render( 
    <HotApp />,
    element
);


//console.log(React);
//console.log(ReactDOM);
