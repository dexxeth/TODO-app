import React, { Children } from "react";

interface ModalProps {
	modalOpen: boolean;
	setModalOpen: (open: boolean) => boolean | void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
	return (
		<div className={`modal ${modalOpen ? "modal-open " : ""}`}>
			<div className="modal-box bg-[#1d1d1f]/95 shadow-lg ring-1 ring-white/10 backdrop-blur-lg">
				<form method="dialog">
					<button
						onClick={() => setModalOpen(false)}
						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white/90 hover:bg-red-500 hover:text-white hover:-translate-y-1 hover:scale-110">
						✕
					</button>
				</form>
				{children}
			</div>
		</div>
	);
};

export default Modal;
