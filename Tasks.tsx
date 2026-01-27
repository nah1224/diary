import { useState } from 'react';
import { tasks as initialTasks } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const priorityVariant = {
  High: 'destructive',
  Medium: 'secondary',
  Low: 'default',
};

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', priority: 'Medium', status: 'Todo' });
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleAddTask = () => {
    if (newTask.title) {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
      setNewTask({ title: '', description: '', dueDate: '', priority: 'Medium', status: 'Todo' });
      toast.success('Task added successfully!');
    } else {
      toast.error('Please provide a title for the task.');
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success('Task deleted successfully!');
  };

  const handleStatusChange = (id: number, status: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status } : task));
    if(status === 'Completed') toast.success('Task marked as complete!');
  };

  const filteredTasks = tasks.filter(task => 
    (filterPriority === 'All' || task.priority === filterPriority) &&
    (filterStatus === 'All' || task.status === filterStatus)
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tasks</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Title" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
          <Input placeholder="Description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
          <div className="flex flex-col md:flex-row gap-4">
            <Input type="date" value={newTask.dueDate} onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} className="flex-grow" />
            <Select value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })} className="flex-grow">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </Select>
          </div>
          <Button onClick={handleAddTask}>Add Task</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Filter Tasks</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <Select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} className="flex-grow">
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </Select>
          <Select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="flex-grow">
            <option>All</option>
            <option>Todo</option>
            <option>In Progress</option>
            <option>Completed</option>
          </Select>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredTasks.map(task => (
          <Card key={task.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className={`font-semibold ${task.status === 'Completed' ? 'line-through text-gray-500' : ''}`}>{task.title}</p>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant={priorityVariant[task.priority as keyof typeof priorityVariant]}>{task.priority}</Badge>
                <Select value={task.status} onChange={e => handleStatusChange(task.id, e.target.value)}>
                  <option>Todo</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </Select>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
