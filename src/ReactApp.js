import React from "react";
import ReactDOM from "react-dom";
import App from 'components/wrsis/App';


const element = document.getElementById( "react-app" );
window.document.appVersion = element.innerHTML;
console.log( 'appVersion =', window.document.appVersion );

ReactDOM.render( 
    <App />,
    element
);


//console.log(React);
//console.log(ReactDOM);
