import "./DeleteModal.scss";
import MainHeading from "../MainHeading/MainHeading";
import ReactModal from "react-modal";
import useAppContext from "../../context/useAppContext";
import { Medium } from "../../interfaces/Memory";
import { Memory } from "../../interfaces/index";

interface DeleteModalProps {
	resourceType: "capsule" | "memory";
	title: string;
	medium?: Medium;
	id?: number;
	handleDeleteModalClick?: () => void;
	coverUrl?: string;
	memories?: Memory[];
}

function DeleteModal({
	resourceType,
	title,
	medium,
	id,
	handleDeleteModalClick,
	coverUrl,
	memories,
}: DeleteModalProps) {
	const {
		isDeleteModalOpen,
		setIsDeleteModalOpen,
		isMemoryDeleteModalOpen,
		setIsMemoryDeleteModalOpen,
	} = useAppContext();

	const rootElement = document.getElementById("root");

	if (rootElement) {
		ReactModal.setAppElement(rootElement);
	} else {
		console.error("Root element not found!");
	}

	return (
		<ReactModal
			className="delete-modal"
			isOpen={
				resourceType === "memory" && isMemoryDeleteModalOpen
					? isMemoryDeleteModalOpen
					: isDeleteModalOpen
			}
			shouldCloseOnEsc={true}
			onRequestClose={() => {
				resourceType === "memory" && setIsMemoryDeleteModalOpen
					? setIsMemoryDeleteModalOpen(false)
					: setIsDeleteModalOpen(false);
			}}
			role={"dialog"}
			aria-labelledby="modal-heading"
			style={{
				overlay: {
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					background: "rgba(230, 230, 230, 0.8)",
					zIndex: 500,
				},
			}}
		>
			<svg
				className="delete-modal__icon"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#757575"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
				onClick={() => {
					resourceType === "memory" && setIsMemoryDeleteModalOpen
						? setIsMemoryDeleteModalOpen(false)
						: setIsDeleteModalOpen(false);
				}}
			>
				<path d="M18 6 6 18" />
				<path d="m6 6 12 12" />
			</svg>
			<div className="delete-modal__container">
				<svg
					className="delete-modal__warning-icon"
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
				<p className="delete-modal__text text-body">
					Are you sure you want to delete the{" "}
					{resourceType === "memory" && (
						<span className="delete-modal__text--bold">{medium + " "}</span>
					)}
					{resourceType === "memory" && `${resourceType} authored by`}
					<span className="delete-modal__text--bold"> {title} </span>? This will
					permanently delete the {resourceType} and cannot be undone.
				</p>
			</div>

			<MainHeading
				headingType="default"
				title={`Delete ${resourceType}`}
				h2={true}
				showIcons={true}
				resourceType={resourceType}
				buttonTitle="Delete"
				memoryId={id}
				handleModalClick={handleDeleteModalClick}
				coverUrl={coverUrl}
				memories={memories}
			/>
		</ReactModal>
	);
}

export default DeleteModal;
