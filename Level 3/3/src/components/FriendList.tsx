import type { FriendListProps } from '../types/FriendProps'
import Friend from './Friend';

export default function FriendList({ friends, onSelect, onDelete }: FriendListProps) {
  return(
    <>
      {friends.map((friend) => (
        <Friend 
          key={friend.id}
          id={friend.id}
          name={friend.name}
          email={friend.email}
          isOnline={friend.isOnline}
          onSelect={onSelect}
          onDelete={onDelete}/>
      ))}
    </>
  );
}