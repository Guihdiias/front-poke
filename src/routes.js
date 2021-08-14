import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Pokemon from './pages/pokemon'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/pokemon/:pokemonName" component={Pokemon} />
        </Switch>
    </BrowserRouter>
);

export default Routes;