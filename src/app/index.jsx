// Browser entry point
require('react-tap-event-plugin')();

var React    = require('react/addons');
var Router   = require('react-router');
var resolver = require('react-resolver').create();
var routes   = resolver.route(require('./routes'));


var appContainer = document.getElementById('app');




// var Atom = {

// 	atom: { data: { count: 0 } },

// 	setCount(count) {
// 		// dummy immutable functionality
// 		Atom.atom = { data: { count: count } };
// 		Atom.onChange();
// 	},

// 	getState() {
// 		return Atom.atom;
// 	},

// 	onChange() {}

// };

// var Inner = React.createClass({

// 	render() {
// 		return <h1>Inner: {this.props.data.count}</h1>;
// 	}

// });

// var Outer = React.createClass({

// 	componentWillMount() {
// 		Atom.onChange = () => {
// 			this.forceUpdate();
// 		};
// 	},

// 	incrementCount(e) {
// 		var currentCount = Atom.getState().data.count;
// 		Atom.setCount(currentCount+1);
// 	},

// 	render() {
// 		var data = Atom.getState().data;
// 		this.data = data;
// 		return (
// 			<div>
// 				<button onClick={this.incrementCount}>+1</button>
// 				<Inner data={data} />
// 			</div>
// 		);
// 	}

// });


// React.render(<Outer />, appContainer);

React.render(<div>Loading</div>, appContainer);

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler />, appContainer);
});
