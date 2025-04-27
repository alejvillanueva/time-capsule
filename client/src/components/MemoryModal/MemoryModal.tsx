import InputField from "../InputField/InputField";
import MainHeading from "../MainHeading/MainHeading";
import "./MemoryModal.scss";
import ReactModal from "react-modal";
import useAppContext from "../../context/useAppContext";

function MemoryModal() {
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
			// overlayClassName="overlay-memory-modal"
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
			<InputField
				inputLabel="Title"
				inputType="text"
				inputId="memory_title"
				inputName="memory_title"
			/>
			<MainHeading headingType="default" title="Add Memory" h2={true} />
		</ReactModal>
	);
}

export default MemoryModal;
