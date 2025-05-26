import "./MemoryModal.scss";
import InputField from "../InputField/InputField";
import MainHeading from "../MainHeading/MainHeading";
import ReactModal from "react-modal";
import useAppContext from "../../context/useAppContext";
import UploadField from "../UploadField/UploadField";
import { useState } from "react";

interface MemoryModalProps {
	memoryTitle?: string;
}

interface MemoryErrors {
	author: boolean;
	message: boolean;
	url: boolean;
}

function MemoryModal({ memoryTitle }: MemoryModalProps) {
	const {
		isOpen,
		setIsOpen,
		memoryFormData,
		setMemoryFormData,
		uploadedFile,
		setUploadedFile,
	} = useAppContext();
	const [memoryErrors, setMemoryErrors] = useState<MemoryErrors>({
		author: false,
		message: false,
		url: false,
	});

	const { author, capsule_id, added_on, medium, message, url } = memoryFormData;

	const handleMemoryChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = e.target;

		setMemoryFormData({ ...memoryFormData, [name]: value });
	};

	// Attach modal to root element
	const rootElement = document.getElementById("root");

	if (rootElement) {
		ReactModal.setAppElement(rootElement);
	} else {
		console.error("Root element not found!");
	}

	const handleMemorySubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateMemoryForm()) return;

		if (!uploadedFile) {
			console.log("No file uploaded");
			return;
		}
		console.log("Uploaded file:", uploadedFile[0]);

		try {
			// Update - replace line below with http request function
			console.log(memoryFormData);

			setIsOpen(false);
		} catch (error) {
			console.error("Error creating/updating capsule:", error);
		}
	};

	const validateMemoryForm = () => {
		const errorStates = {
			author: false,
			message: false,
			url: false,
		};
		const urlPattern =
			/^https?:\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|webp|svg)$/;

		// Update - author should be title
		// Title field
		if (!author) {
			console.error("Missing title field");
			errorStates.author = true;
		} else if (author.length < 5) {
			console.error("Title must contain min. 5 characters");
			errorStates.author = true;
		}

		// URL field
		if (!url) {
			console.error("Missing url field");
			errorStates.url = true;
		} else if (urlPattern.test(url)) {
			console.error("Invalid url");
			errorStates.url = true;
		}

		// Optional data
		if (message && message.length < 3) {
			console.error("Caption must contain min. 3 characters");
			errorStates.message = true;
		}

		setMemoryErrors(errorStates);

		if (Object.values(memoryErrors).includes(true)) {
			return false;
		}

		return true;
	};

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
					zIndex: 100,
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
			<form className="memory-modal__form" onSubmit={handleMemorySubmit}>
				<div className="memory-modal__container">
					<InputField
						inputLabel="Memory Medium"
						inputType="select"
						inputId="medium"
						inputName="medium"
						handleChange={handleMemoryChange}
						validation={{ required: false }}
					/>
					{/* Update - don't need author field in memory, title instead */}
					<InputField
						inputLabel="Title"
						inputType="text"
						inputId="memory_title"
						inputName="memory_title"
						placeholder="Type the Memory Title"
						handleChange={handleMemoryChange}
						validation={{ required: true, isInvalid: memoryErrors.author }}
					/>
					<InputField
						inputLabel="Caption"
						inputType="textArea"
						inputId="message"
						inputName="message"
						placeholder="Type the Caption"
						handleChange={handleMemoryChange}
						validation={{ required: false, isInvalid: memoryErrors.message }}
					/>
				</div>
				<UploadField
					uploadLabel="Image"
					uploadId="memory_image"
					uploadName="memory_image"
					onFileChange={setUploadedFile}
				/>
			</form>

			{memoryTitle ? (
				<MainHeading
					headingType="custom"
					title={memoryTitle}
					h2={true}
					resourceType="memory"
				/>
			) : (
				<MainHeading
					headingType="default"
					title="Add Memory"
					h2={true}
					resourceType="memory"
					showIcons={true}
				/>
			)}
		</ReactModal>
	);
}

export default MemoryModal;
