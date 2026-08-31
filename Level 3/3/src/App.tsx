import { useState, useEffect } from 'react'
import MessageList from './components/MessageList'
import UserCard from './components/UserCard'
import Card from './components/Card'
import Friend from './components/Friend'
import ProfileCard from './components/ProfileCard'
import LoginForm from './components/LoginForm'
import TaskList from './components/TaskList'
import TaskCard from './components/TaskCard'

import type { FriendProps } from './types/FriendProps'
import type { MessageProps } from './types/MessageProps'
import type { MessageListProps } from './types/MessageProps'

import './index.css'
import FriendList from './components/FriendList';
import ProfileAuth from './components/ProfileAuth';
import type { TaskProps } from './types/Task';

function App(){
  const [count, setCount] = useState(0);

  const handleSelect = (id: number) => {
    console.log(`Selected id: ${id}`);
  }

  const handleDelete = (id: number) => {
    console.log(`Deleting id: ${id}`);
  }

  const user = 'Andrei';

  const sampleTask: TaskProps = {
    id: "task-101",
    title: "Build Level 3 Challenge Component",
    status: "in-progress",
    priority: "high",
  };

  function handleComplete(taskId: string) {
    console.log("Completed:", taskId);
  }

  const myFriends: FriendProps[] = [
    { id: 1, name: "Juan", email: "juan@gmail.com", isOnline: true  },
    { id: 2, name: "Doe", email: "doe@gmail.com", isOnline: true },
    { id: 3, name: "Maria", email: "maria@gmail.com", isOnline: false }
  ];

  const messages: MessageProps[] = [
    {
      id: 1,
      sender: "Joshua",
      message: "Hello!",
      timestamp: "10:30 AM",
      isMine: false,
    },
    {
      id: 2,
      sender: "Andrei",
      message: "Hi Joshua!",
      timestamp: "10:31 AM",
      isMine: true,
    },
    {
      id: 3,
      sender: "Joshua",
      message: "How are you?",
      timestamp: "10:32 AM",
      isMine: false,
    },
  ];

  useEffect(() =>{
    console.log('rendered');
  }, []);

  return (
    <>
      <TaskCard task={sampleTask} onComplete={handleComplete} />
      {/* <TaskList/> */}
      {/* <ProfileAuth /> */}
      {/* <Friend friends={myFriends} /> */}
      {/* <MessageList messages={messages}/> */}
      {/* <FriendList friends={myFriends} onSelect={handleSelect} onDelete={handleDelete}/> */}
      {/* <ProfileCard
        name="Joshua"
        username="joshua"
        bio="I love coding."
        isOnline={true}
      />
      <ProfileCard
        name="Maria"
        username="maria"
      /> */}
      {/* <LoginForm/> */}
    </>
  );
}

export default App
