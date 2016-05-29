// es6 import not working for jquery/bootstrap
var $ = require("jquery");
global.jQuery = $;
var bootstrap = require('bootstrap');

import ReactDOM from 'react-dom';
import React from 'react';

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
if (app == 'enigma2') ReactDOM.render(<Enigma2App />, document.getElementById('appContainer'));
else if (app == 'tvheadend') ReactDOM.render(<TVHeadendApp />, document.getElementById('appContainer'));
