
import React from "react";
import PropTypes from "prop-types";

import loadable from "@loadable/component";
import LoadingChunk from "components/misc/LoadingChunk";


const LoadableComponent = loadable( 
    (props) => {
        console.log( 'loadable:', Object.keys( props ));
        return import( `./${props.layout}` );
    }, 
    {
        fallback: <LoadingChunk />
    }
);

const loadableAdmin = ({...props}) => <LoadableComponent {...props} layout="Admin.js" />;
const loadableInvoice = () => <LoadableComponent layout="Invoice.js" />;
const loadableRTL = () => <LoadableComponent layout="RTL.js" />;
const loadableUISamples = () => <LoadableComponent layout="UISamples.js" />;

export default {
    loadableAdmin,
    loadableInvoice,
    loadableRTL,
    loadableUISamples,
};

LoadableComponent.propTypes = {
    layout: PropTypes.string,
};
