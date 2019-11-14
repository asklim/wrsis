module.exports = function (api) {

  //const isTest = api.env('test');
  // You can use isTest to determine what presets and plugins to use.
  // Jest set NODE_ENV to 'test'

  const presets = [
    [ "@babel/preset-env",
      {
        targets: {
          edge: "17",
          firefox: "60",
          chrome: "67",
          safari: "11.1",
          node: "current",
        },
        //useBuiltIns: "usage",
      }
    ],
    [ "@babel/preset-react",
      {
        "pragma": "dom",          // default pragma is React.createElement
        "pragmaFrag": "DomFrag",  // default is React.Fragment
        "throwIfNamespace": false // defaults to true
      }
    ]
  ];

  const plugins = [
    "@babel/plugin-proposal-class-properties"
  ];

  api.cache.forever();
  
  return {
    presets,
    plugins
  };
};