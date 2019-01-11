"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
function Greeting(props) {
  return dom("h1", null, "React Component: ", props.name);
}

var contentNode = document.getElementById('contents1');
var component1 = dom("h1", null, "Hello World!"); // A simple JSX component

const component2 = dom(Greeting, {
  name: "Hello World!"
});
(0, _reactDom.render)(component1, contentNode); // Render the component inside the content Node

(0, _reactDom.render)(component2, document.getElementById('contents2'));
const continents = ['Africa', 'America', 'Asia', 'Australia', 'Antarctida', 'Europe']; // при маппинге строго кривая ковычка ``

const message = continents.map(c => `Hello ${c}!`).join(' ');
const element = dom("p", null, message);
(0, _reactDom.render)(element, document.getElementById('contents3'));
(0, _reactDom.render)(dom("h1", null, "Hello, I am Groot"), document.getElementById('root'));
var News = createReactClass({
  displayName: 'News',
  render: function render() {
    return dom("div", {
      className: "news"
    }, "\u041A \u0441\u043E\u0436\u0430\u043B\u0435\u043D\u0438\u044E, \u043D\u043E\u0432\u043E\u0441\u0442\u0435\u0439 \u043D\u0435\u0442.");
  }
});

var Comments = _react.default.createClass({
  displayName: "Comments",
  render: function render() {
    return dom("div", {
      className: "comments"
    }, "\u041D\u0435\u0442 \u043D\u043E\u0432\u043E\u0441\u0442\u0435\u0439 - \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043D\u0435\u0447\u0435\u0433\u043E");
  }
});

var App = _react.default.createClass({
  displayName: "App",
  render: function render() {
    return dom("div", {
      className: "app"
    }, "\u0412\u0441\u0435\u043C \u043F\u0440\u0438\u0432\u0435\u0442, \u044F \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442 App! \u042F \u0443\u043C\u0435\u044E \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C \u043D\u043E\u0432\u043E\u0441\u0442\u0438.", dom(News, null), dom(Comments, null));
  }
});

window.React = _react.default;
(0, _reactDom.render)(dom(App, null), document.getElementById('body1'));
console.log(_react.default);
console.log(ReactDOM);