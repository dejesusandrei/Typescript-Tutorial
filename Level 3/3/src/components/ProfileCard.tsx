import type { ProfileCardProps } from '../types/ProfileCardProps'

export default function ProfileCard({ name, username, bio="No bio available.", isOnline=false }: ProfileCardProps) {
	return (
		<div>
			<h3>{name}</h3>
			<p>@{username}</p>
			<p>{bio}</p>
			<p>{isOnline ? 'Online' : 'Offline'}</p>
			<br />
		</div>
	);
}
