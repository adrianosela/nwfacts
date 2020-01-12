import React from 'react';
import { HomePage } from './container/index'
import {Switch, Route} from 'react-router-dom'
import {IndexRoute} from 'react-router'

//Import all page components here 
import HOME from './components/Home/index';
import APP from './components/AppComp/index';

const Routes = (props) => {
  return (
      <HomePage>
        <Switch>
          <Route exact component={HOME} path='/' />
          <Route exact component={APP} path='/App' />
        </Switch>
      </HomePage>
  );
}

export default Routes;
