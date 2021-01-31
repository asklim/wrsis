module.exports = function (api) {

    api.cache( true );

    //const isTest = api.env('test');
    // You can use isTest to determine what presets and plugins to use.
    // Jest set NODE_ENV to 'test'

    const presets = [
        [ "@babel/env",
            {
                targets: {
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1",
                    node: "current",
                },
                useBuiltIns: "usage",
                "corejs": "3.6.5",
            }
        ],
        [ "@babel/react",
            {
                pragma: "dom",          // default pragma is React.createElement
                pragmaFrag: "DomFrag",  // default is React.Fragment
                throwIfNamespace: false // defaults to true
            }
        ]
    ];

    const plugins = [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-transform-runtime",
        "react-hot-loader/babel",
        [ "module-resolver", 
            {
                root: ["./src"]
            }
        ]
    ];

    
    return {
        presets,
        plugins
    };
};
