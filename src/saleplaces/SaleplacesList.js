import React from 'react';
import SaleplaceFull from './SaleplaceFull.js';
import SaleplacesSummary from './SaleplacesSummary.js';
import fetch from 'isomorphic-fetch';

export default class SaleplacesList extends React.Component {
  
  constructor(props) {
    super(props);
    //console.log('constructor');
    this.state = {
      list: [],
      loading: false
    };     
  }

  componentDidMount() {
    //console.log('compDidMount');
    this._getPlacesList();
  }

  _getPlacesList () {
    //console.log('getPlacesList');
    this.setState({loading: true});
    let host = window.location.origin;
    let route = host+'/api/saleplaces';
    console.log(route);
    fetch(route)
      .then( response => {
        //console.log(response.json());
        return response.json();}
      )
      .then(json => json.map(place => place))
      .then(list => {
        //console.log(list);      
        this.setState({list, loading: false});
        })
      .catch(err => {console.log(err); })
    ;
  }

  _templateVerticalInline (lst) {
    return lst.map((item,index) => {
      //console.log(item);
      return (
        <div key={index}>
          <SaleplaceFull data={item} />
        </div>  
      );
    });
  }

  _templateHorizontalInline (lst) {
    return (
      <table>
      <tbody>
        <tr>
        {lst.map((item,index) => {
          return (    
          <td key={index}>
            <div>
            <SaleplaceFull data={item} />
            </div>
          </td>  );            
        })}
        </tr>
      </tbody>
      </table>
    );
  }

  render() {
    const { list, loading } = this.state;
    
    //console.log(list.length);
    //  var data = this.props.data;

    if (loading) {
      return <div>Loading saleplaces ...</div>;

    } else {
      let listTemplate;

      listTemplate = list.length > 0 
        ? this._templateHorizontalInline(list)
        : <p>Список пуст</p>
      ;
      //console.log(list.length);     
      return (
      <div className="saleplaceslist">
        <SaleplacesSummary count={list.length}/>
        {listTemplate}
      </div> );     
    }

      
  }
}