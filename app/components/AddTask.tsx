import { HiPlusCircle } from "react-icons/hi";
import Modal from "./Modal";
import React, { FormEventHandler, useState, useRef, useEffect } from "react";

interface AddTaskProps {
	addTask: (task: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ addTask }) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [newTaskValue, setNewTaskValue] = useState<string>("");
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		console.log(newTaskValue);
		if (newTaskValue.trim() !== "") {
			addTask(newTaskValue.trim());
			setNewTaskValue("");
			setModalOpen(false);
		}
	};

	useEffect(() => {
		if (modalOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [modalOpen]);

	return (
		<div className="flex items-center justify-center">
			<button
				onClick={() => setModalOpen(true)}
				className="btn btn-circle bg-[#1d1d1f]/90 rounded-full text-white/90 text-xl size-20 shadow-2xl border-none hover:bg-white/90 hover:text-[#1d1d1f]/90 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-300 "
				aria-label="Add Task">
				<HiPlusCircle size={80} />
			</button>
			<Modal modalOpen={modalOpen} setModalOpen={setModalOpen} >
				<form onSubmit={handleSubmitNewTodo}>
					<h3 className="font-bold text-lg">Add new task</h3>
					<div className="modal-action">
						<input
							ref={inputRef}
							value={newTaskValue}
							onChange={(e) => setNewTaskValue(e.target.value)}
							required
							type="text"
							placeholder="Enter your task"
							className="input input-bordered w-full shadow-lg bg-white/15 backdrop-blur-lg"
						/>
						<button
							type="submit"
							className="btn shadow-lg text-white/90 hover:bg-blue-500 hover:text-white bg-white/15 backdrop-blur-lg">
							Submit
						</button>
					</div>
				</form>
			</Modal>
		</div>
	);
};

export default AddTask;
