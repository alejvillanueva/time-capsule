import "./MemoryModal.scss";
import InputField from "../InputField/InputField";
import MainHeading from "../MainHeading/MainHeading";
import UploadField from "../UploadField/UploadField";
import DeleteModal from "../DeleteModal/DeleteModal";
import ReactModal from "react-modal";
import useAppContext from "../../context/useAppContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Memory } from "../../interfaces/index";
import { Medium } from "../../interfaces/Memory";
import { createMemory, getMemory, updateMemory } from "../../services/index";
import { uploadFile } from "../../utils/media";

interface MemoryWithoutMedium extends Omit<Memory, "medium"> {
	medium: Medium | "";
}

interface MemoryModalProps {
	fetchCapsule: (id: number) => Promise<void>;
	memoryId: number | null;
	handleDeleteModalClick: () => void;
}

interface MemoryErrors {
	medium: boolean;
	author: boolean;
	message: boolean;
	url: boolean;
}

function MemoryModal({
	fetchCapsule,
	memoryId,
	handleDeleteModalClick,
}: MemoryModalProps) {
	const { capsuleId } = useParams();
	const {
		isModalOpen,
		setIsModalOpen,
		uploadedFile,
		setUploadedFile,
		memoryModalMode,
		isFormEditable,
		setIsFormEditable,
	} = useAppContext();
	const [memoryFormData, setMemoryFormData] = useState<MemoryWithoutMedium>({
		author: "",
		capsule_id: Number(capsuleId) ?? null,
		id: Number(memoryId) ?? null,
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

			// Remove "id" property during POST request
			const { id, ...addReadyMemory } = memory as Memory;

			const newMemory = await createMemory(addReadyMemory);
			if (newMemory[0].id) {
				setMemoryFormData({
					author: "",
					capsule_id: Number(capsuleId) ?? null,
					id: Number(memoryId) ?? null,
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
				fetchCapsule(Number(capsuleId));
				setIsModalOpen(false);
			}
		} catch (error) {
			console.error("Adding memory error:", error);
		}
	};

	const uploadMedia = async (files: File[]) => {
		const file = files[0];
		setUploadedFile(file);
	};

	const fetchMemory = async (id: number) => {
		try {
			const [data] = await getMemory(id);

			setMemoryFormData(data);
		} catch (error) {
			console.error("Fetching memory error:", error);
		}
	};

	useEffect(() => {
		if (memoryId) fetchMemory(Number(memoryId));
	}, [memoryId]);

	const editMemory = async (memory: Memory) => {
		try {
			await updateMemory(memory);

			fetchCapsule(Number(capsuleId));
			fetchMemory(Number(memoryId) ?? Number(memory.id));
			setIsFormEditable(false);
		} catch (error) {
			console.error("Updating memory error:", error);
		}
	};

	useEffect(() => {
		if (isModalOpen && memoryModalMode === "add")
			setMemoryFormData({
				author: "",
				capsule_id: Number(capsuleId) ?? null,
				id: Number(memoryId) ?? null,
				added_on: new Date(),
				medium: "",
				message: "",
				url: "",
			});
	}, [isModalOpen, memoryModalMode, memoryId]);

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
			const mediaURL = await uploadFile(uploadedFile);
			console.log("URL", mediaURL);
		}

		if (memoryModalMode === "add") {
			await addMemory(memoryFormData);
		} else {
			await editMemory(memoryFormData as Memory);
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
		<>
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
								inputLabel="Medium"
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
						{/* TODO: add state and styling for when image is uploaded, but upload field is available */}
						{memoryFormData.medium === "image" &&
							(memoryModalMode === "add" || memoryModalMode === "edit") && (
								<UploadField
									uploadLabel="Image"
									uploadId="memory_image"
									uploadName="url"
									onFileChange={uploadMedia}
								/>
							)}
						{memoryFormData.medium === "image" &&
							memoryModalMode === "read" && (
								<div className="memory-modal__container">
									<p className="memory-modal__label text-label">Image</p>
									<div className="memory-modal__media-container text-body">
										{/* TODO: allow image to be edited as well somehow, add cta for */}
										{memoryFormData.url ? (
											<img
												className="memory-modal__image"
												src={memoryFormData.url}
												alt={`Memory image by ${memoryFormData.author}`}
											/>
										) : (
											"No image selected, please upload an image"
										)}
									</div>
								</div>
							)}
						{memoryFormData.medium === "video" &&
							(memoryModalMode === "add" || memoryModalMode === "edit") && (
								<UploadField
									uploadLabel="Video"
									uploadId="memory_video"
									uploadName="url"
									onFileChange={uploadMedia}
								/>
							)}
						{memoryFormData.medium === "video" &&
							memoryModalMode === "read" && (
								<div className="memory-modal__container">
									<p className="memory-modal__label text-label">Image</p>
									<div className="memory-modal__media-container text-body">
										{/* TODO: allow video to be edited as well somehow, add cta for */}
										{memoryFormData.url ? (
											<video
												className="memory-modal__video"
												src={memoryFormData?.url}
												controls
											></video>
										) : (
											"No video selected, please upload a video"
										)}
									</div>
								</div>
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
						{memoryModalMode === "add" ? (
							<MainHeading
								headingType="default"
								title="Add Memory"
								h2={true}
								resourceType="memory"
								showIcons={true}
							/>
						) : memoryModalMode === "edit" && isFormEditable ? (
							<MainHeading
								headingType="custom-editable"
								title={`${memoryFormData.author}'s Memory`}
								h2={true}
								resourceType="memory"
								showIcons={true}
							/>
						) : (
							<MainHeading
								headingType="custom"
								title={`${memoryFormData.author}'s Memory`}
								h2={true}
								resourceType="memory"
								showIcons={true}
								handleModalClick={handleDeleteModalClick}
							/>
						)}
					</div>
				</form>
			</ReactModal>
			{memoryId && memoryFormData.author && memoryFormData.medium && (
				<DeleteModal
					title={memoryFormData.author}
					medium={memoryFormData.medium}
					id={memoryFormData.id || undefined}
					resourceType="memory"
					handleDeleteModalClick={handleDeleteModalClick}
				/>
			)}
		</>
	);
}

export default MemoryModal;
