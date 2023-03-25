import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Canvas from './Canvas';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { CONSTANTS } from './util';
import { Atoms } from './examples/Atoms';
import { Selectors } from './examples/Selectors';
import { EditProperties } from './EditProperties';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider>
        <Router>
          <Switch>
            <Route path={CONSTANTS.Routes.Examples.Atoms}>
              <Atoms />
            </Route>
            <Route path={CONSTANTS.Routes.Examples.Selectors}>
              <Selectors />
            </Route>
            <Route>
              <Canvas />
            </Route>
          </Switch>
        </Router>
        <EditProperties />
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
