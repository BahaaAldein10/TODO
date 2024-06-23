"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function Todo() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editTask, setEditTask] = useState("");
  const [completed, setCompleted] = useState<boolean[]>([]);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      const storedCompleted = localStorage.getItem("completed");
      if (storedTasks) setTasks(JSON.parse(storedTasks));
      if (storedCompleted) setCompleted(JSON.parse(storedCompleted));
    } catch (error) {
      console.error("Failed to load tasks from local storage!", error);
    }
  }, []);

  const handleSubmit = () => {
    if (newTask.trim() !== "") {
      const myTasks = [...tasks, newTask.trim()];
      setTasks(myTasks);
      localStorage.setItem("tasks", JSON.stringify(myTasks));
      setCompleted([...completed, false]);
      setNewTask("");
    }
  };

  const handleDelete = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    const updatedCompleted = completed.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setCompleted(updatedCompleted);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem("completed", JSON.stringify(updatedCompleted));
  };

  const handleEdit = (index: number) => {
    try {
      const updatedTasks = [...tasks];
      updatedTasks[index] = editTask.trim();
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setEditTask("");
    } catch (error) {
      console.error("Failed to update task!", error);
    }
  };

  const toggleComplete = (index: number) => {
    const updatedCompleted = [...completed];
    updatedCompleted[index] = !updatedCompleted[index];
    setCompleted(updatedCompleted);
    localStorage.setItem("completed", JSON.stringify(updatedCompleted));
  };

  return (
    <section className="text-2xl font-semibold">
      <div className="flex justify-between items-center">
        <h1>My Tasks ({tasks.length})</h1>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Add Task</Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="text-black">
            <AlertDialogHeader>
              <AlertDialogTitle>Add Task ✔️</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Add Task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.currentTarget.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="flex flex-col gap-4 mt-5">
        {tasks.length === 0 ? (
          <p className="text-center">
            No tasks available. Add a new task to get started! 😜
          </p>
        ) : (
          tasks.map((task, index) => (
            <div
              key={index}
              className="bg-white text-black shadow-md px-5 py-4 rounded-md flex justify-between items-center text-xl"
            >
              <h1
                className={`${
                  completed[index] ? "line-through" : ""
                } cursor-pointer`}
                onClick={() => toggleComplete(index)}
              >
                {task}
              </h1>
              <div className="flex gap-4 items-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Edit
                      className="cursor-pointer"
                      color="#7547d1"
                      onClick={() => setEditTask(tasks[index])}
                    />
                  </AlertDialogTrigger>

                  <AlertDialogContent className="text-black">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Edit Task ✔️</AlertDialogTitle>
                      <AlertDialogDescription>
                        <Input
                          type="text"
                          placeholder="Edit Task..."
                          value={editTask}
                          onChange={(e) => setEditTask(e.currentTarget.value)}
                        />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleEdit(index)}>
                        Edit
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Trash2
                  className="cursor-pointer"
                  color="#ff0000"
                  onClick={() => handleDelete(index)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Todo;
