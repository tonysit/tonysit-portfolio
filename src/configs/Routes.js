import * as React from 'react';

// all page screen
import NoMatch from '../components/NoMatch';
import HomeComponent from '../components/home/HomeComponent';

const Routes = [
    { path: '/', component: HomeComponent, exact: true },
    { path: '*', component: NoMatch, exact: false }
];

export default Routes;