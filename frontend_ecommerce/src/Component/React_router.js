import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import App from '../App';
import Product from './ProductsComponent/Product';
function React_router() {
	return (
		<Router>
			<Switch>
				<Route path='/' exact>
					{' '}
					<App />{' '}
				</Route>
				<Route path='/products' exact>
					<Product />
				</Route>
			</Switch>
		</Router>
	);
}

export default React_router;
