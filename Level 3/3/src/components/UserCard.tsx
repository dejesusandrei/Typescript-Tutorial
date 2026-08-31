import { useState } from 'react'
import type { UserCardProps } from '../types/UserCardProps'

export default function UserCard({name, email, age}: UserCardProps) {
	const [userName, setUserName] = useState(name || 'Andrei');
	const [userEmail, setUserEmail] = useState(email || 'exmaple@gmai.com');
	const [userAge, setUserAge] = useState(email || '19');

  return(
		<div>
			<h1>Name: {userName}</h1>
			<h1>Email: {userEmail}</h1>
			<h1>Age: {userAge ? userAge : 'Not Provided'} </h1>
		</div>
	);
}