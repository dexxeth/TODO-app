import React, { FormEventHandler, useState, useRef, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";

interface TodoListProps {
	tasks: string[];
	setTasks: React.Dispatch<React.SetStateAction<string[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, setTasks }) => {
	const [modalOpenEdit, setOpenModalEdit] = useState<boolean>(false);
	const [taskToEdit, setTaskToEdit] = useState<string>("");
	// const [editedTask, setEditedTask] = useState<string>("");
	const [taskIndexToEdit, setTaskIndexToEdit] = useState<number | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		if (taskToEdit.trim() !== "" && taskIndexToEdit !== null) {
			const updatedTasks = tasks.map((task, index) =>
				index === taskIndexToEdit ? taskToEdit : task
			);
			setTasks(updatedTasks);
			localStorage.setItem("tasks", JSON.stringify(updatedTasks));
			setOpenModalEdit(false);
		}
	};

	const handleDeleteTodo = (tasksToDelete: string) => {
		const updatedTasks = tasks.filter((task) => task !== tasksToDelete);
		setTasks(updatedTasks);
		localStorage.setItem("tasks", JSON.stringify(updatedTasks));
	};

	useEffect(() => {
		if (modalOpenEdit && inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [modalOpenEdit]);

	return (
		<div className=" overflow-y-auto max-h-[calc(60vh-9rem)] no-scrollbar rounded-xl shadow-lg scrollable-table">
			<table className="table fixed-header-table">
				<thead>
					<tr>
						<th>S. No.</th>
						<th>Tasks</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className=" text-white text-base ">
					{tasks.map((task, index) => (
						<tr
							key={index}
							className="border-none bg-white/20 hover:bg-white/65 hover:text-black/90 ">
							<td className="w-10">{index + 1}</td>
							<td className="w-full"> {task} </td>
							<td className="flex gap-5">
								<FiEdit
									onClick={() => {
										setOpenModalEdit(true);
										setTaskToEdit(task);
										setTaskIndexToEdit(index);
									}}
									cursor="pointer"
									className="hover:text-blue-500 hover:-translate-y-1 hover:scale-110"
									size={20}
								/>
								<Modal
									modalOpen={modalOpenEdit}
									setModalOpen={setOpenModalEdit}>
									<form onSubmit={handleSubmitEditTodo}>
										<h3 className="font-bold text-lg text-white">
											Edit task
										</h3>
										<div className="modal-action">
											<input
												ref={inputRef}
												value={taskToEdit}
												onChange={(e) =>
													setTaskToEdit(
														e.target.value
													)
												}
												required
												type="text"
												placeholder="Enter your task"
												className="input input-bordered w-full shadow-lg text-white"
											/>
											<button
												type="submit"
												className="btn shadow-lg text-white/90 hover:bg-blue-500 hover:text-white">
												Submit
											</button>
										</div>
									</form>
								</Modal>
								<FiTrash2
									onClick={() => {
										handleDeleteTodo(task);
									}}
									cursor="pointer"
									className="hover:text-red-500 hover:-translate-y-1 hover:scale-110"
									size={20}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TodoList;
