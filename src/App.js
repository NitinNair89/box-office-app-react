import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import E404 from './pages/E404';
import Home from './pages/Home';
import Starred from './pages/Starred';
import './index.css';
import ShowInfo from './pages/ShowInfo';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};

export default function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
