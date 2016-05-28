// app.js
/*
 * Core
 */
var $ = require("jquery");
global.jQuery = $;
var bootstrap = require('bootstrap');
var ReactDOM = require('react-dom');
var React = require('react');

/*
 * Enigma2App
 */
var Enigma2App = require('enigma2-app');

/*
 * TVHeadendApp
 */
var TVHeadendApp = require('tvheadend-app');

/*
 * render app
 */
if (app == 'enigma2') ReactDOM.render(<Enigma2App url="/api/v1/enigma2" />, document.getElementById('appContainer'));
else if (app == 'tvheadend') ReactDOM.render(<TVHeadendApp url="/api/v1/enigma2" />, document.getElementById('appContainer'));