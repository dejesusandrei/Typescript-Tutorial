import { useState } from 'react';
import { useTask } from '../hooks/useTask'

export default function TaskList() {
  const { tasks, isLoading, addTask, deleteTask } = useTask();
  const [newTask,setNewTask] = useState("");

  const handleAdd = () => {
    if (!newTask.trim()) return; // Huwag ituloy kapag walang tina-type
    addTask(newTask);
    setNewTask(""); // Linisin ang input field
  };

  if(isLoading) return <p>Loading...</p>
  return(
    <div>
      <input 
        type="text" 
        placeholder="Type a new task" 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)}
      />
      {/* Directly pass handleAdd to onClick */}
      <button onClick={handleAdd}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="flex gap-x-2 items-center p-2 text-sm">
            {task?.title}
            <button onClick={() => deleteTask(task.id)} className="border rounded-lg px-2 py-1">
              Delete Task
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}