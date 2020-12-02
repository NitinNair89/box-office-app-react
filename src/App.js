import React from 'react';
import { Switch, Route } from 'react-router-dom';
import E404 from './pages/E404';
import Home from './pages/Home';
import Starred from './pages/Starred';
import './index.css';
import ShowInfo from './pages/ShowInfo';

export default function App() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Home />
      </Route>
      <Route exact={true} path="/starred">
        <Starred />
      </Route>

      <Route exact={true} path="/show/:showID">
        <ShowInfo />
      </Route>
      <Route>
        <E404 />
      </Route>
    </Switch>
  );
}
