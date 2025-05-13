import InputField from "../InputField/InputField";
import MainHeading from "../MainHeading/MainHeading";
import "./MemoryModal.scss";
import ReactModal from "react-modal";
import useAppContext from "../../context/useAppContext";
import UploadField from "../UploadField/UploadField";

interface MemoryModalProps {
	memoryTitle?: string;
}

function MemoryModal({ memoryTitle }: MemoryModalProps) {
	const { isOpen, setIsOpen } = useAppContext();

	const rootElement = document.getElementById("root");

	if (rootElement) {
		ReactModal.setAppElement(rootElement);
	} else {
		console.error("Root element not found!");
	}

	return (
		<ReactModal
			className="memory-modal"
			isOpen={isOpen}
			shouldCloseOnEsc={true}
			onRequestClose={() => {
				setIsOpen(false);
			}}
			role={"dialog"}
			aria-labelledby="modal-heading"
			style={{
				overlay: {
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-start",
					background: "rgba(230, 230, 230, 0.8)",
					outline: "none",
				},
			}}
		>
			<svg
				className="memory-modal__icon"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#757575"
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
				onClick={() => {
					setIsOpen(false);
				}}
			>
				<path d="M18 6 6 18" />
				<path d="m6 6 12 12" />
			</svg>
			<form className="memory-modal__form">
				<div className="memory-modal__container">
					<InputField
						inputLabel="Memory Type"
						inputType="select"
						inputId="memory_type"
						inputName="memory_type"
					/>
					<InputField
						inputLabel="Title"
						inputType="text"
						inputId="memory_title"
						inputName="memory_title"
						placeholder="Type the Memory Title"
					/>
					<InputField
						inputLabel="Caption"
						inputType="textArea"
						inputId="memory_caption"
						inputName="memory_caption"
						placeholder="Type the Caption"
					/>
				</div>
				<UploadField
					uploadLabel="Image"
					uploadId="memory_image"
					uploadName="memory_image"
				/>
			</form>

			{memoryTitle ? (
				<MainHeading headingType="custom" title={memoryTitle} h2={true} />
			) : (
				<MainHeading
					headingType="default"
					title="Add Memory"
					h2={true}
					showIcons={true}
				/>
			)}
		</ReactModal>
	);
}

export default MemoryModal;
