import {render} from 'react-dom';
import {Router, Route, hashHistory, IndexRoute, browserHistory,HashRouter,Switch,Redirect,Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './redux/reducers';
import asyncBundle from './components/common/asyncBundle'
import 'bootstrap/dist/css/bootstrap.css';

import Blank from 'bundle-loader?lazy&name=Blank!./components/common/Blank';

class Product extends React.Component{
	render(){
		return (<div>Product</div>);
	}
}

class About extends React.Component{
	render(){
		return (<div>
			 About
			 <Link to='/contact'>contact</Link>
			 <Switch>
				 <Route strict path={`/about/product`} component={Product}></Route>
				 <Redirect path="*" to="/" />
			 </Switch>
			</div>);
	}
}

class Contact extends React.Component{
	render(){
		return (<div>Contact</div>);
	}
}

class NoMatch extends React.Component{
	render(){
		return (<div>NoMatch</div>);
	}
}

class Main extends React.Component{

	render(){
		let {match} = this.props;
		return (
			<div>dfd
			<Switch>
				<Route path='/about' component={About}></Route>
				<Route path='/contact'component={Contact}></Route>
				<Redirect path="*" to="/contact" />
			</Switch>
			</div>);
	}
}



$(function(){
	const store = createStore(reducer);
	const Routes = (
		<div>
		
		<Switch>
			<Route path='/blank' component={asyncBundle(Blank)}></Route>
			<Route path="/" component={Main}></Route>
			<Redirect path="*" to="/" />
		</Switch>
		</div>
	);

	require.ensure([], function () {
		class App extends React.Component {
			render() {
				return (
						<Provider store={store}>
							<HashRouter>{Routes}</HashRouter>
						</Provider>
				);
			}
		}
		
		render(<App></App>, document.getElementById('root'));
		
	}, "App");

});

if (module.hot) {
	module.hot.accept();
}
