import React from 'react';
import Comments from './comments.js';
import News from './news.js';

export default class  App extends React.Component {
  // displayName: 'App',
  render() {
    return (
      <div className="app">
        Всем привет, я компонент App! Я умею отображать новости.
      <News />
      <Comments />
      </div>
    );
  }
}

