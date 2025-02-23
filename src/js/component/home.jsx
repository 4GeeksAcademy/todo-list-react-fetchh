import React, { useEffect, useState } from "react";
const API_URL = "https://playground.4geeks.com/todo/users/adler";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [todo, setTodo] = useState([]);
	const [task, setTask] = useState({ label: "" });
	console.log("holA TODO",todo)
      
	useEffect(() => {
	  fetchTasks();   
	}, []);    
  
	const fetchTasks = async () => {
	  try {
		const response = await fetch("https://playground.4geeks.com/todo/users/adler");
		const data = await response.json();
		setTodo(data.todos);
	  } catch (error) {
		console.error("Error fetching tasks", error);
	  }
	};  
  
	const addTask = async () => {
	  if (!task.label.trim()) return;          
	  try {
		await fetch("https://playground.4geeks.com/todo/todos/adler", {
		  method: "POST",
		  headers: { "Content-Type": "application/json" },
		  body: JSON.stringify(task)          
		});
		setTask({ label: "" });
		fetchTasks();
	  } catch (error) {
		console.error("Error adding task", error);
	  }
	};
  
	const handleKeyDown = (e) => {
	  if (e.key === "Enter") {
		e.preventDefault();
		addTask();
	  }
	};
  
	const eliminar = async (id) => {
	  try {
		await fetch(`https://playground.4geeks.com/todo/todos/${id}`, { method: "DELETE" });
		setTodo(todo.filter((t) => t.id !== id));
	  } catch (error) {
		console.error("Error deleting task", error);
	  }
	};
  
	const eliminarTodas = async () => {
	  try {
		for (const t of todo) {
		  await fetch(`https://playground.4geeks.com/todo/todos/${t.id}`, { method: "DELETE" });
		}
		setTodo([]);
	  } catch (error) {
		console.error("Error deleting all tasks", error);
	  }
	};
  
	return (
	  <div className="mx-auto mt-3 p-3 shadow p-3 mb-5 bg-body-tertiary rounded" style={{ width: "590px" }}>
		<form action="" className="form">
		  <div className="mb-3">
			<label htmlFor="Input1" className="form-label"></label>
			<input
			  value={task.label}
			  onKeyDown={handleKeyDown}
			  onChange={(e) => setTask({ ...task, label: e.target.value })}
			  type="text"
			  className="form-control"
			  id="Input1"
			  placeholder="Agregar Tarea"
			/>
		  </div>
		  <ul className="list-group">
			{todo?.map((t) => (
			  <li className="list-group-item d-flex justify-content-between" key={t.id}  style={{cursor:"pointer" }} >
				{t.label}
				<button className="border border-0 bg-white eliminar-btn" onClick={() => eliminar(t.id)}    >
				  ❌
				</button>
			  </li>
			))}
		  </ul> 
		</form>
		<span>
		  {todo?.length} Items left <i className="bi bi-x-circle-fill"></i>
		</span>
		<button onClick={eliminarTodas} className="btn btn-danger mt-3" style={{ width: "100%" }}>
		  Eliminar todas las tareas
		</button>
		
	  </div>
	);

};

export default Home;
