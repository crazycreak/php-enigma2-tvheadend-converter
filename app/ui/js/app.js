var App = React.createClass({
        render: function() {
                var message = 'Hello World Application!';
                return <h1>{message}</h1>;
        }
});

// render app
ReactDOM.render(<App />, document.getElementById('appContainer'));