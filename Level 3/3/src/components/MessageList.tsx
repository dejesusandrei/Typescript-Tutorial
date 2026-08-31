import type { MessageListProps } from '../types/MessageProps'
import Message from './Message'
export default function MessageList({ messages }: MessageListProps){
	return(
		<>
			{messages.map((message) => {
				return(
          <>
            <Message
              id={message.id}
              sender={message.sender}
              message={message.message}
              timestamp={message.timestamp}
              isMine={message.isMine} />
            <br />
          </>
				);
			})}
		</>
	);
}