import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CONTEXT } from './config'
import indexHome from './containers/indexHome/indexHome';
import Home from './containers/Home/home';
import result from './containers/Result/result';
import test from './containers/test/test'
import loadingIndex from './containers/loadingIndex/loadingIndex';
import music from './containers/test/music';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path={`${CONTEXT}/music`} component={music} />
          <Route path={`${CONTEXT}/loadingIndex`} component={loadingIndex} />
          <Route path={`${CONTEXT}/test`} component={test} />
          <Route path={`${CONTEXT}/indexHome`} component={indexHome} />
          <Route path={`${CONTEXT}/home`} component={Home} />
          <Route path={`${CONTEXT}/result`} component={result} />
        </Switch>
      </Router>
    );
  }
}

export default App;
