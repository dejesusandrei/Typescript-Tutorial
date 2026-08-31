import type { FriendComponentProps } from '../types/FriendProps'

export default function Friend({ id, name, email, isOnline, onSelect, onDelete }: FriendComponentProps) {
  return(
    <>
      <div key={id}>
        <h3>{name}</h3>
        <p>{email}</p>
        <span>{isOnline ? 'Online' : 'Offline'}</span>
        <br />
        <button onClick={() => onSelect(id)}>
          Click me
        </button>
        <br />
        <button onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
      <br />
    </>
  );
}