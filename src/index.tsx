import React, { Suspense } from 'react';
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
import { Async } from './examples/Async';
import { AtomEffects } from './examples/AtomEffect';

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
            <Route path={CONSTANTS.Routes.Examples.Async}>
              <Suspense fallback={<>Loading Page Data...</>}>
                <Async />
              </Suspense>
            </Route>
            <Route path={CONSTANTS.Routes.Examples.AtomEffect}>
              <AtomEffects />
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
