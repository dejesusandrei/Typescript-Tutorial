import type { LoginFormProps } from '../types/LoginFormProps'
import React, { useState, useRef } from 'react'


export default function LoginForm(){
	const [form, setForm] = useState<LoginFormProps>({
		email: "",
		password: ""
	});

	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setForm({...form, [name]: value});
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError("");
		if(!form.email || !form.password){
			setError("Email and password are required.");
      return;
		}

		setIsLoading(true);
		console.log(`Email: ${form.email}\nPassword: ${form.password}`);
		setTimeout(() =>{
			setIsLoading(false);
			setForm({email: "", password: ""})
		}, 2000);
	}

	const handleFocus = () =>{
		inputRef.current?.focus();
	}

	return(
		<>
			<form onSubmit={handleSubmit}>
				<h1>Login</h1>
				<input
					name="email"
					type="email"
					placeholder="Email"
					value={form.email}
					onChange={handleChange}
				/>
				<br />

				<input
					ref={inputRef}
					name="password"
					type="password"
					placeholder="Password"
					value={form.password}
					onChange={handleChange}
				/>
				{error && <p className="text-red-500">{error}</p>}
				<br />

				<button type="submit" disabled={isLoading}>
					{isLoading ? "Logging in..." : "Login"}
				</button>
				<br />
				<button  onClick={handleFocus}>
					Focus Input
				</button>
      </form>
		</>
	);
}