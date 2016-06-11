import React from 'react';
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

/*
 * BootstrapApp
 */
import BootstrapApp from 'bootstrap-app';
/*
 * Enigma2App
 */
import Enigma2App from 'enigma2-app';

/*
 * TVHeadendApp
 */
import TVHeadendApp from 'tvheadend-app';

/*
 * render app
 */
render((
        <Router history={browserHistory}>
                <Route path="/ui/" component={BootstrapApp}>
                        <Route path="enigma2" component={Enigma2App} />
                        <Route path="tvheadend" component={TVHeadendApp} />
                </Route>
        </Router>
), document.getElementById('appContainer'));
