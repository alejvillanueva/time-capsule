import "./DeleteModal.scss";
import MainHeading from "../MainHeading/MainHeading";
import useAppContext from "../../context/useAppContext";
import ReactModal from "react-modal";

interface DeleteModalProps {
	capsuleTitle: string;
	isModalOpen: boolean;
	setIsModalOpen: (value: boolean) => void;
}

function DeleteModal({
	capsuleTitle,
	isModalOpen,
	setIsModalOpen,
}: DeleteModalProps) {
	const rootElement = document.getElementById("root");

	if (rootElement) {
		ReactModal.setAppElement(rootElement);
	} else {
		console.error("Root element not found!");
	}

	return (
		<ReactModal
			className="delete-modal"
			isOpen={isModalOpen}
			shouldCloseOnEsc={true}
			onRequestClose={() => {
				setIsModalOpen(false);
			}}
			role={"dialog"}
			aria-labelledby="modal-heading"
			style={{
				overlay: {
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					background: "rgba(230, 230, 230, 0.8)",
					outline: "none",
					zIndex: 100,
				},
			}}
		>
			<div className="delete-modal__container">
				<svg
					className="delete-modal__icon"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="#d10000"
					stroke="#ffffff"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
					<path d="M12 9v4" />
					<path d="M12 17h.01" />
				</svg>
				<p className="delete-modal__text">{`Are you sure you want to delete the ${capsuleTitle} capsule? This will permanently delete the capsule and cannot be undone.`}</p>
			</div>

			<MainHeading
				headingType="default"
				title="Delete Capsule"
				h2={true}
				showIcons={true}
				resourceType="capsule"
			/>
		</ReactModal>
	);
}

export default DeleteModal;
