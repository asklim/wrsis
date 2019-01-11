"use strict";

var _react = require("react");

var _reactDom = require("react-dom");

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*ReactDOM.render(
  <div className='header'>
    <strong className='summary'>Всего торговых мест: {placesCount}</strong>
  </div>,
  document.getElementById('header')
);*/
var SaleplaceFull = React.createClass({
  displayName: "SaleplaceFull",
  render: () => {
    var data = (void 0).props.data;
    return dom("div", {
      className: "saleplacefull"
    }, dom("p", {
      className: "splaceId"
    }, "ID: ", data._id), dom("p", null, "rec#: ", data['rec#']), dom("p", null, "Name: ", data.Name), dom("p", null, "Full: ", data.FullName), dom("p", null, "Moll: ", data.Moll), dom("p", null, "Floor: ", data.Floor), dom("p", null, "Sectr: ", data.Sector), dom("p", null, "Line: ", data.Line), dom("p", null, "Place: ", data.Place), dom("p", null, "Addr: ", data.Address), dom("p", null, "Descr: ", data.Description), dom("p", null, "Notes: ", data.Notes), dom("p", null, "Host: ", data.Host), dom("p", null, "Updated at: ", data.updatedAt), dom("br", null));
  }
});

class SalePlacesList extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      placesList: [],
      loading: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    let host = window.location.origin;
    (0, _isomorphicFetch.default)(host + '/api' + window.location.pathname).then(response => this.setState({
      response,
      loading: false
    }));
  }

  render() {
    const _this$state = this.state,
          data = _this$state.data,
          loading = _this$state.loading; //  var data = this.props.data;

    var listTemplate;
    listTemplate = data.length > 0 ? data.map((item, index) => {
      return dom("div", {
        key: index
      }, dom(SaleplaceFull, {
        data: item
      }));
    }) : dom("p", null, "\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u0443\u0441\u0442");
    return loading ? dom("div", null, "Loading saleplaces ...") : dom("div", {
      className: "saleplaceslist"
    }, dom(SalePlacesSummary, {
      data: data.length
    }), listTemplate);
  }

}

var SalePlacesSummary = React.createClass({
  displayName: "SalePlacesSummary",
  render: () => {
    return dom("div", {
      className: "saleplacessummary"
    }, dom("strong", {
      className: "summary"
    }, "\u0412\u0441\u0435\u0433\u043E \u0442\u043E\u0440\u0433\u043E\u0432\u044B\u0445 \u043C\u0435\u0441\u0442: ", (void 0).props.data));
  }
});
var Body = React.createClass({
  displayName: "Body",
  render: () => {
    return dom("div", {
      className: "body"
    }, dom(SalePlacesList, null));
  }
});
(0, _reactDom.render)(dom(Body, null), document.getElementById('body'));