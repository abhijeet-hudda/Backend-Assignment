import { useState } from "react";
import { useTasks, useCreateTask, useDeleteTask, useUpdateTask } from "../queries/taskQueries.js";
import toast from "react-hot-toast";
import Input from "../components/Input.components.jsx";
import Button from "../components/Button.components.jsx";
import Card from "../components/Card.jsx";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    page: 1,
  });

  const { data, isLoading } = useTasks(filters);
  const createTask = useCreateTask();
  const deleteTask = useDeleteTask();
  const updateTask = useUpdateTask();
  const navigate = useNavigate();

  // Task creation state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newStatus, setNewStatus] = useState("PENDING");
  const [newPriority, setNewPriority] = useState("MEDIUM");

  // Task editing state
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("PENDING");
  const [editPriority, setEditPriority] = useState("MEDIUM");

  const handleCreate = () => {
    if (!title) return toast.error("Title required");
    createTask.mutate(
      { title, description, status: newStatus, priority: newPriority },
      {
        onSuccess: () => {
          toast.success("Task created");
          setTitle("");
          setDescription("");
          setNewStatus("PENDING");
          setNewPriority("MEDIUM");
        },
        onError: () => toast.error("Error"),
      }
    );
  };

  const handleDelete = (taskId) => {
    deleteTask.mutate(taskId, {
      onSuccess: () => toast.success("Task deleted"),
      onError: () => toast.error("Delete failed"),
    });
  };

  const handleEdit = (task) => {
    setEditTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditStatus(task.status);
    setEditPriority(task.priority);
  };

  const handleUpdate = (taskId) => {
    if (!editTitle) return toast.error("Title required");
    updateTask.mutate(
      { taskId, title: editTitle, description: editDescription, status: editStatus, priority: editPriority },
      {
        onSuccess: () => {
          toast.success("Task updated");
          setEditTaskId(null);
          setEditTitle("");
          setEditDescription("");
        },
        onError: () => toast.error("Update failed"),
      }
    );
  };

  if (isLoading) return <p className="p-6 text-white bg-black">Loading...</p>;

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Dashboard</h2>
        <Button className="w-auto px-4 bg-red-600 hover:bg-red-700" onClick={() => navigate("/logout")}>Logout</Button>
      </div>

      {/* Create Task */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <Input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="New Task"/>
        <Input value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description (optional)"/>
        <select
          className="bg-zinc-900 p-2 border border-zinc-700 text-white rounded"
          value={newStatus}
          onChange={e => setNewStatus(e.target.value)}
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
        <select
          className="bg-zinc-900 p-2 border border-zinc-700 text-white rounded"
          value={newPriority}
          onChange={e => setNewPriority(e.target.value)}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <Button className="w-auto px-4" onClick={handleCreate}>Add</Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <select
          className="bg-zinc-900 p-2 border border-zinc-700 text-white"
          value={filters.status}
          onChange={e => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>

        <select
          className="bg-zinc-900 p-2 border border-zinc-700 text-white"
          value={filters.priority}
          onChange={e => setFilters({ ...filters, priority: e.target.value })}
        >
          <option value="">All Priority</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      {/* Tasks */}
      <div className="grid gap-3">
        {data?.tasks?.map((task) => (
          <Card key={task._id}>
            {editTaskId === task._id ? (
              <div className="flex gap-2 items-center flex-wrap">
                <Input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                <Input value={editDescription} onChange={e => setEditDescription(e.target.value)} placeholder="Description (optional)" />
                <select
                  className="bg-zinc-900 p-2 border border-zinc-700 text-white rounded"
                  value={editStatus}
                  onChange={e => setEditStatus(e.target.value)}
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>
                <select
                  className="bg-zinc-900 p-2 border border-zinc-700 text-white rounded"
                  value={editPriority}
                  onChange={e => setEditPriority(e.target.value)}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
                <Button className="w-auto px-2 bg-green-600 hover:bg-green-700" onClick={() => handleUpdate(task._id)}>Save</Button>
                <Button className="w-auto px-2 bg-gray-600 hover:bg-gray-700" onClick={() => setEditTaskId(null)}>Cancel</Button>
              </div>
            ) : (
              <div className="flex justify-between items-center flex-wrap">
                <div>
                  <h3 className="text-lg">{task.title}</h3>
                  {task.description && <p className="text-sm text-gray-300">{task.description}</p>}
                  <p className="text-sm text-gray-400">
                    {task.status} | {task.priority}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button className="w-auto px-2 bg-yellow-600 hover:bg-yellow-700" onClick={() => handleEdit(task)}>Edit</Button>
                  <Button className="w-auto px-2 bg-red-600 hover:bg-red-700" onClick={() => handleDelete(task._id)}>Delete</Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}