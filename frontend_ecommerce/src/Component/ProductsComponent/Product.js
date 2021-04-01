import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Product.css';
import cookie from 'react-cookies';
import { Drawer, Button } from 'antd';
import { addItemToCart } from './helper';
import { Redirect } from 'react-router-dom';
function Product() {
	const [products, setproducts] = useState([]);
	const [cart, setcart] = useState({});
	const [cartvisible, setcartvisible] = useState(false);
	const [logout, setlogout] = useState(false);
	const [qtn, setqtn] = useState(0);
	useEffect(() => {
		axios.get('http://localhost:5001/api/allproducts').then((data) => {
			console.log(data);
			setproducts(data.data.data);
		});
	}, []);

	const addtocart = (id, qtn) => {
		console.log(id, qtn);
		addItemToCart((id, qtn), () => {
			console.log('added');
		});
	};

	const onsubmit = (e) => {
		e.preventDefault();
		alert('Succefully orderd');
	};

	const showcards = () => {
		setcartvisible(true);
	};

	const onClose = () => {
		setcartvisible(false);
	};

	const addcart = (name) => {
		if ((cart[name] !== undefined && cart[name] + qtn > 5) || qtn > 5) {
			alert('cannot order more than 5');
			return;
		}
		// setcart((cart) => [...cart, name]);
		setcart({ ...cart, [name]: qtn });

		// console.log(cart);
	};

	const signout = () => {
		console.log('clicked');
		cookie.remove('token');
		cookie.remove('userid');
		setlogout(true);
	};
	return (
		<div>
			<nav className='pro__navbar'>
				<h2 className='pro__brand'>ecommerce</h2>
				<div className='pro__btn'>
					<button className='pro__cart' onClick={showcards}>
						Cart
					</button>
					<button className='pro__cart'>profile</button>
					<button className='pro__cart' onClick={signout}>
						logout
					</button>
				</div>
			</nav>

			<div className='allproducts'>
				{products.map((pro) => (
					<div key={pro.id} className='product'>
						<h3>{pro.name}</h3>
						<h3>{pro.price}</h3>
						<h3>{pro.availability}</h3>
						<input
							type='number'
							onChange={(e) => setqtn(e.target.value)}
							max={5}
						></input>
						<Button
							onClick={() => addcart(pro.name)}
							className='addtocart'
						>
							add to cart
						</Button>
					</div>
				))}
			</div>

			<Drawer
				title='Create a new account'
				width={720}
				onClose={onClose}
				visible={cartvisible}
				bodyStyle={{ paddingBottom: 80 }}
				footer={
					<div
						style={{
							textAlign: 'right',
						}}
					>
						<Button
							onClick={onClose}
							style={{ marginRight: 8 }}
						>
							Cancel
						</Button>
						<Button onClick={onsubmit} type='primary'>
							Submit
						</Button>
					</div>
				}
			>
				<div className='allproducts'>
					{console.log(cart)}
					{Object.keys(cart).map((name) => (
						<div key={name} className='product'>
							<h3>{name}</h3>
							<h3>{cart[name]}</h3>
						</div>
					))}
				</div>
			</Drawer>
			{logout && <Redirect to='/' />}
		</div>
	);
}

export default Product;
