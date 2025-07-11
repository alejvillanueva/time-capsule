import "./MemoryModal.scss";
import InputField from "../InputField/InputField";
import MainHeading from "../MainHeading/MainHeading";
import UploadField from "../UploadField/UploadField";
import ReactModal from "react-modal";
import useAppContext from "../../context/useAppContext";
import { useEffect, useState } from "react";
import { Memory } from "../../interfaces/index";
import { useParams } from "react-router-dom";
import { createMemory } from "../../services/index";
import { Medium } from "../../interfaces/Memory";

interface MemoryWithoutMedium extends Omit<Memory, "medium"> {
	medium: Medium | "";
}

interface MemoryErrors {
	medium: boolean;
	author: boolean;
	message: boolean;
	url: boolean;
}

function MemoryModal({ fetchCapsule }: any) {
	const { capsuleId } = useParams();
	const {
		isModalOpen,
		setIsModalOpen,
		uploadedFile,
		setUploadedFile,
		memoryModalMode,
		setIsFormEditable,
	} = useAppContext();
	const [memoryFormData, setMemoryFormData] = useState<MemoryWithoutMedium>({
		author: "",
		capsule_id: Number(capsuleId) ?? 0,
		added_on: new Date(),
		medium: "",
		message: "",
		url: "",
	});
	const [memoryErrors, setMemoryErrors] = useState<MemoryErrors>({
		medium: false,
		author: false,
		message: false,
		url: false,
	});

	const addMemory = async (memory: MemoryWithoutMedium) => {
		try {
			if (memory.medium === "") {
				throw new Error("Medium must be selected before submitting.");
			}

			const newMemory = await createMemory(memory as Memory);
			if (newMemory[0].id) {
				setMemoryFormData({
					author: "",
					capsule_id: Number(capsuleId) ?? 0,
					added_on: new Date(),
					medium: "",
					message: "",
					url: "",
				});
				setMemoryErrors({
					medium: false,
					author: false,
					message: false,
					url: false,
				});
				fetchCapsule(capsuleId);
				setIsModalOpen(false);
			}
		} catch (error) {
			console.error("Adding memory error:", error);
		}
	};

	useEffect(() => {
		if (isModalOpen && memoryModalMode === "add")
			setMemoryFormData({
				author: "",
				capsule_id: Number(capsuleId) ?? 0,
				added_on: new Date(),
				medium: "",
				message: "",
				url: "",
			});
	}, [isModalOpen, memoryModalMode]);

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

	const handleMemorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateMemoryForm()) return;

		// TODO: update logic for upload file
		if (!uploadedFile) {
			console.log("No file uploaded");
			// return;
		} else {
			console.log("Uploaded file:", uploadedFile[0]);
		}

		if (memoryModalMode === "add") {
			await addMemory(memoryFormData);
			console.log("Submitted!");
		} else {
			// await editMemory(memoryFormData);
		}
	};

	const validateMemoryForm = () => {
		const errorStates = {
			medium: false,
			author: false,
			message: false,
			url: false,
		};
		const urlPattern =
			/^https?:\/\/[^\s/$.?#].[^\s]*\.(jpg|jpeg|png|gif|webp|svg)$/;

		let alertMessage = "Please revise the following errors before submitting:";

		// Medium field
		if (memoryFormData.medium === "") {
			console.error("Medium field missing");
			alertMessage += "\nMedium field missing, select a memory type";
			errorStates.medium = true;
		} else {
			// Author field
			if (!memoryFormData.author) {
				console.error("Missing author field");
				alertMessage += "\nMissing author field";
				errorStates.author = true;
			} else if (memoryFormData.author.length < 3) {
				console.error("Author must contain min. 3 characters");
				alertMessage += "\nAuthor must contain min. 3 characters";
				errorStates.author = true;
			}

			// URL field
			if (!memoryFormData.url && memoryFormData.medium === "image") {
				console.error("Missing image file");
				alertMessage += "\nMissing image field";
				errorStates.url = true;
			} else if (!memoryFormData.url && memoryFormData.medium === "video") {
				console.error("Missing video file");
				alertMessage += "\nMissing video field";
				errorStates.url = true;
			} else if (memoryFormData.url && urlPattern.test(memoryFormData.url)) {
				console.error("Invalid url");
				alertMessage += "\nInvalid url";
				errorStates.url = true;
			}

			// Optional data
			if (memoryFormData.message && memoryFormData.message.length < 3) {
				console.error("Caption must contain min. 3 characters");
				alertMessage += "\nCaption must contain min. 3 characters";
				errorStates.message = true;
			}
		}

		if (Object.values(errorStates).includes(true)) {
			alert(alertMessage);
			setMemoryErrors(errorStates);
			return false;
		}

		return true;
	};

	return (
		<ReactModal
			className="memory-modal"
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
					setIsModalOpen(false);
				}}
			>
				<path d="M18 6 6 18" />
				<path d="m6 6 12 12" />
			</svg>
			<form className="memory-modal__form" onSubmit={handleMemorySubmit}>
				<div className="memory-modal__form-container">
					<div className="memory-modal__container">
						<InputField
							inputLabel="Memory Medium"
							inputType="select"
							inputId="memory_medium"
							inputName="medium"
							handleChange={handleMemoryChange}
							validation={{ required: false }}
							value={memoryFormData.medium}
						/>
						{(memoryFormData.medium === "image" ||
							memoryFormData.medium === "video") && (
							<>
								<InputField
									inputLabel="Author"
									inputType="text"
									inputId="memory_author"
									inputName="author"
									placeholder="Type the Author(s) of the Memory"
									handleChange={handleMemoryChange}
									validation={{
										required: true,
										isInvalid: memoryErrors.author,
									}}
									value={memoryFormData.author}
								/>
								<InputField
									inputLabel="Caption"
									inputType="textArea"
									inputId="memory_message"
									inputName="message"
									placeholder="Type the Caption"
									handleChange={handleMemoryChange}
									validation={{
										required: false,
										isInvalid: memoryErrors.message,
									}}
									value={memoryFormData.message}
								/>
							</>
						)}
						{memoryFormData.medium === "text" && (
							<InputField
								inputLabel="Author"
								inputType="text"
								inputId="memory_author"
								inputName="author"
								placeholder="Type the Author(s) of the Memory"
								handleChange={handleMemoryChange}
								validation={{
									required: true,
									isInvalid: memoryErrors.author,
								}}
								value={memoryFormData.author}
							/>
						)}
					</div>
					{memoryFormData.medium === "" && (
						<div className="memory-modal__filler"></div>
					)}
					{(memoryFormData.medium === "image" ||
						memoryFormData.medium === "video") && (
						<UploadField
							uploadLabel="Image"
							uploadId="memory_image"
							uploadName="url"
							onFileChange={setUploadedFile}
						/>
					)}
					{memoryFormData.medium === "text" && (
						<div className="memory-modal__container">
							<InputField
								inputLabel="Message"
								inputType="textArea"
								inputId="memory_message"
								inputName="message"
								placeholder="Type the Message"
								handleChange={handleMemoryChange}
								validation={{
									required: false,
									isInvalid: memoryErrors.message,
								}}
								value={memoryFormData.message}
							/>
						</div>
					)}
				</div>
				<div className="memory-modal__form-container">
					{/* TODO: revise with author vs title updates */}
					{memoryModalMode !== "add" ? (
						<MainHeading
							headingType="custom"
							title={`<name>'s Memory`}
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
				</div>
			</form>
		</ReactModal>
	);
}

export default MemoryModal;
