import type { MessageListProps } from '../types/MessageProps' 
import type { MessageProps } from '../types/MessageProps'

export default function Message({ id, sender, message, timestamp, isMine }: MessageProps) {
	return(
		<div>
			<h3>{isMine ? "You" : sender}</h3>
			<p>{message}</p>
			<small>{timestamp}</small>
		</div>
	);
}