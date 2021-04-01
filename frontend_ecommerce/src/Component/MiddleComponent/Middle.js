import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';
import './Middle.css';
import cookie from 'react-cookies';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Redirect } from 'react-router-dom';
function Middle() {
	const [signup_modal, setsignup_modal] = useState(false);
	const [login_modal, setlogin_modal] = useState(false);
	const [islogedin, setislogedin] = useState(false);
	const [name, setname] = useState('');
	const [email, setemail] = useState('');
	const [pass, setpassword] = useState('');
	const onSignup = () => {
		setsignup_modal(true);
	};

	const onRegister = (e) => {
		e.preventDefault();

		axios.post('http://localhost:5001/api/signup', {
			id: uuidv4(),
			name: name,
			email: email,
			pass: pass,
		}).then((data) => {
			const { token, id } = data;
			console.log(data);
			setsignup_modal(false);
			cookie.save('token', data.data.token);
			console.log(data.data.id);
			cookie.save('userid', data.data.user.id);
			setislogedin(true);
		});
	};

	const OnLogin = (e) => {
		e.preventDefault();
		setlogin_modal(false);
		axios.post('http://localhost:5001/api/signin', {
			email: email,
			pass: pass,
		})
			.then((data) => {
				cookie.save('token', data.data.token);
				cookie.save('userid', data.data.result[0].id);
				setislogedin(true);
			})
			.catch(() => {
				alert('username or passworf invalid');
			});
	};
	const onlogin_btn = () => {
		setlogin_modal(true);
	};

	return (
		<div>
			<div className='middle'>
				<h1 style={{ fontSize: '5vw' }}>
					Buy the things You want...
				</h1>
				<div className='middle_btns'>
					<Button onClick={onSignup} className='middle_btn'>
						Sign up
					</Button>
					<Button onClick={onlogin_btn} className='middle_btn'>
						Login
					</Button>
				</div>
			</div>
			<Modal
				title='SignUp'
				centered
				closable='true'
				visible={signup_modal}
				footer={null}
			>
				<div className='modal__popup'>
					<Input
						size='large'
						placeholder='Enter ur name'
						value={name}
						onChange={(e) => setname(e.target.value)}
					/>
					<br />
					<Input
						size='large'
						placeholder='Enter ur mail'
						value={email}
						onChange={(e) => setemail(e.target.value)}
					/>
					<br />
					<Input.Password
						size='large'
						placeholder='passsword'
						value={pass}
						onChange={(e) => setpassword(e.target.value)}
					/>
					<br />
					<Button
						onClick={onRegister}
						style={{ marginLeft: '30px' }}
					>
						Register
					</Button>
				</div>
			</Modal>

			<Modal
				title='SignUp'
				centered
				visible={login_modal}
				closable='true'
				footer={null}
			>
				<div className='modal__popup'>
					<Input
						size='large'
						placeholder='Enter ur mail'
						value={email}
						onChange={(e) => setemail(e.target.value)}
					/>
					<Input.Password
						size='large'
						placeholder='passsword'
						value={pass}
						onChange={(e) => setpassword(e.target.value)}
					/>
					<Button onClick={OnLogin}>Login</Button>
				</div>
			</Modal>
			{islogedin && <Redirect to='/products' />}
		</div>
	);
}

export default Middle;
