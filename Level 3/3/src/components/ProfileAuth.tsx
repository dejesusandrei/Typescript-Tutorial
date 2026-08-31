import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";


export default function ProfileAuth(){
	const { user, logout } = useAuth();
	const { toggleTheme } = useTheme();

	return(
		<>
		<div>
			<h3>{user?.name || 'No user'}</h3>
			<p>{user?.email || 'No email'}</p>
			<br />
			<button onClick={logout}>
				Logout
			</button>
			<br />
			<button onClick={toggleTheme}>
				Theme Mode
			</button>
		</div>
		</>
	);
}