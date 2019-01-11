import { Component } from 'react';
import { render } from 'react-dom';
import fetch from 'isomorphic-fetch';



/*ReactDOM.render(
  <div className='header'>
    <strong className='summary'>Всего торговых мест: {placesCount}</strong>
  </div>,
  document.getElementById('header')
);*/


var SaleplaceFull = React.createClass({
  render: () => {

    var data = this.props.data;
    return (
      <div className='saleplacefull'>
        <p className='splaceId'>ID: {data._id}</p>
        <p>rec#: {data['rec#']}</p>
        <p>Name: {data.Name}</p>
        <p>Full: {data.FullName}</p>
        <p>Moll: {data.Moll}</p>
        <p>Floor: {data.Floor}</p>
        <p>Sectr: {data.Sector}</p>
        <p>Line: {data.Line}</p>
        <p>Place: {data.Place}</p>
        <p>Addr: {data.Address}</p>
        <p>Descr: {data.Description}</p>
        <p>Notes: {data.Notes}</p>
        <p>Host: {data.Host}</p>
        <p>Updated at: {data.updatedAt}</p>
        <br/>        
      </div>
    );
  }
});

class SalePlacesList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      placesList:[],
      loading: false
    }; 
  }

  componentDidMount() {
    this.setState({loading: true});
    let host = window.location.origin;
    fetch(host+'/api'+window.location.pathname)
      .then(response =>
        this.setState({response, loading: false})
      );
  }

  render() {
    const { data, loading } = this.state;

    //  var data = this.props.data;
    var listTemplate;

    listTemplate = data.length > 0 
      ? data.map((item,index) =>{
          return (
            <div key={index}>
              <SaleplaceFull data={item} />
            </div>  
          );
        })
      : <p>Список пуст</p>
    ;

    return (loading) ?
      <div>Loading saleplaces ...</div> : (
      <div className="saleplaceslist">
        <SalePlacesSummary data={data.length}/>
        {listTemplate}
      </div>
    );
  }
}

var SalePlacesSummary = React.createClass({
  render: () => {
    return (
      <div className="saleplacessummary">
        <strong className='summary'>Всего торговых мест: {this.props.data}</strong>
      </div>
    );
  }
});

var Body = React.createClass({
  render: () => {
    return (
      <div className="body">        
        <SalePlacesList />        
      </div>
    );
  }
});

render(
  <Body />,
  document.getElementById('body')
);

