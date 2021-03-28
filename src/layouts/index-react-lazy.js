
import React, { Suspense } from "react";
import PropTypes from "prop-types";

import LoadingChunk from "components/misc/LoadingChunk";

/* КОМПОНЕНТЫ НЕ ОТОБРАЖАЮТСЯ В ОТЛИЧИЕ ОТ loadable */

const Lazy = React.lazy( 
    (props) => {
        console.log( 'layouts.index.lazy:', Object.keys( props ));
        return import( `./${props.layout}` );
    }
);

const LazyComponent = (props) => {
    console.log( 'layouts.index.lazyComponent:', Object.keys( props ));
    return (
        <Suspense fallback={<LoadingChunk />}>
            <Lazy {...props} />
        </Suspense>
    );
};


const loadableAdmin = ({...props}) => <LazyComponent {...props} layout="Admin.js" />;
const loadableInvoice = () => <LazyComponent layout="Invoice.js" />;
const loadableRTL = () => <LazyComponent layout="RTL.js" />;
const loadableUISamples = () => <LazyComponent layout="UISamples.js" />;

export default {
    loadableAdmin,
    loadableInvoice,
    loadableRTL,
    loadableUISamples,
};

LazyComponent.propTypes = {
    layout: PropTypes.string,
};
