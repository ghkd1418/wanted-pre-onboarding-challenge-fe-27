import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@/app/useAuth';

import api from '@/shared/lib/api';
import validator from '@/shared/lib/validator';

interface IAuthResponse {
	token: string;
	message: string;
}

const DEFAULT_PATH = '/';

//TODO: 로그인 완료 시 사이드바에서 Auth 페이지 지워주기 혹은 마이페이지로 변경 해주기

function Auth() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const MY_CONSTANT = 'aa';
	console.log(MY_CONSTANT);

	const { signin, user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from || DEFAULT_PATH;

	const handleAlreadyLoggedIn = () => {
		toast('이미 로그인 되어있습니다.');
		navigate(from);
	};

	useEffect(() => {
		if (user) {
			handleAlreadyLoggedIn();
		}
	}, []);

	const performLogin = () => {
		// 로그인 성공 시 원래 가고자 했던 페이지로 리다이렉트
		navigate(from);
	};

	const failAuthAction = () => {};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const email = event.target.value;

		setEmail(email);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const password = event.target.value;

		setPassword(password);
	};

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const { token, message } = await api
				.post<IAuthResponse>('users/login', {
					json: {
						email,
						password,
					},
					showErrorToast: true,
				})
				.json();

			toast.success(message);
			signin(token, performLogin);
		} catch {
			failAuthAction();
		}
	};

	const handleSignup = async () => {
		try {
			const { token, message } = await api
				.post<IAuthResponse>('users/create', {
					json: {
						email,
						password,
					},
					showErrorToast: true,
				})
				.json();

			toast.success(message + '\n\n가입하신 계정으로 로그인 되었습니다.');
			signin(token, performLogin);
		} catch {
			failAuthAction();
		}
	};

	const isSubmitDisabled =
		!validator.isEmail(email) || !validator.isLength(password, { min: 8 });

	return (
		<div>
			<h3>로그인페이지</h3>
			<form onSubmit={handleLogin}>
				<label htmlFor="email">
					email
					<br />
					<input
						type="text"
						name="email"
						value={email}
						onChange={handleEmailChange}
						autoFocus
						required
					/>
				</label>
				<br />
				<br />
				<label htmlFor="password">
					password
					<br />
					<input
						type="password"
						name="password"
						value={password}
						onChange={handlePasswordChange}
						required
					/>
				</label>
				<br />
				<button
					type="submit"
					disabled={isSubmitDisabled}
					style={{
						backgroundColor: !isSubmitDisabled ? '#0073e5' : 'lightgray',
						color: !isSubmitDisabled ? 'white' : 'gray',
						opacity: !isSubmitDisabled ? 1 : 0.5,
						border: 'none',
						cursor: !isSubmitDisabled ? 'pointer' : 'not-allowed',
					}}
				>
					로그인
				</button>
			</form>
			<button onClick={handleSignup}>회원가입</button>
		</div>
	);
}

export default Auth;
