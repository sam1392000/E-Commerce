import './App.css';
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import Navbar from './Component/NavbarComponent/Navbar';
import Middle from './Component/MiddleComponent/Middle';
import Product from './Component/ProductsComponent/Product';
import cookie from 'react-cookies';
import Frontpage from './Component/Frontpage';
import { Redirect } from 'react-router-dom';
function App() {
	const [isloggedin, setisloggedin] = useState(false);
	useEffect(() => {
		if (cookie.load('token') !== undefined) {
			setisloggedin(true);
		}
	}, []);
	return (
		<div className='App'>
			{isloggedin ? <Redirect to='/products' /> : <Frontpage />}
		</div>
	);
}

export default App;
