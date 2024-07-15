"use client";

import React, { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";

export default function Home() {
	const [tasks, setTasks] = useState<string[]>([]);
	const [showModal, setModalOpen] = useState(false);

	useEffect(() => {
		const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
		setTasks(storedTasks);
	}, []);

	const addTask = (task: string) => {
		const newTasks = [...tasks, task];
		setTasks(newTasks);
		localStorage.setItem("tasks", JSON.stringify(newTasks));
		setModalOpen(false);
	};

	return (
		<main className="flex items-center justify-center h-screen w-screen">
			<video
				src={require("../public/bgVideo.mp4")}
				autoPlay
				muted
				loop
				className=" h-screen w-screen object-cover fixed"
			/>
			<div className=" min-w-[70%] max-h-[70%] rounded-2xl bg-white/5 shadow-lg ring-1 ring-white/10 backdrop-blur-lg isolate ">
				<h1 className="text-center text-4xl text-white/90 m-4 font-bold font-sans">
					TODO LIST
				</h1>
				<AddTask addTask={addTask} />
				<div className="flex-grow overflow-y-auto no-scrollbar m-4">
					<TodoList tasks={tasks} setTasks={setTasks} />
				</div>
			</div>
		</main>
	);
}
