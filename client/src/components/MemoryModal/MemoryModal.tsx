import "./MemoryModal.scss";
import InputField from "../InputField/InputField";
import MainHeading from "../MainHeading/MainHeading";
import UploadField from "../UploadField/UploadField";
import DeleteModal from "../DeleteModal/DeleteModal";
import ReactModal from "react-modal";
import useAppContext from "../../context/useAppContext";
import { useEffect, useState } from "react";
import { FileWithPath } from "react-dropzone";
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
	file: boolean;
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
		isMemoryFormEditable,
		setIsMemoryFormEditable,
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
		file: false,
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
					file: false,
				});
				fetchCapsule(Number(capsuleId));
				setIsModalOpen(false);
			}
		} catch (error) {
			console.error("Adding memory error:", error);
		}
	};

	const uploadMedia = async (files: FileWithPath[]) => {
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
			setIsMemoryFormEditable(false);
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

	useEffect(() => {
		if (isModalOpen && memoryModalMode !== "add" && memoryId)
			fetchMemory(Number(memoryId));
	}, [isMemoryFormEditable]);

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

		if (memoryFormData.medium !== "text" && uploadedFile) {
			try {
				const mediaURL = await uploadFile(uploadedFile);

				if (!validateURL(mediaURL)) return;

				memoryFormData.url = mediaURL;
				fetchMemory(Number(memoryId));
			} catch (error) {
				console.error("Error with file - no valid url");
			}
		}

		if (memoryModalMode === "add") {
			await addMemory(memoryFormData);
		} else {
			await editMemory(memoryFormData as Memory);
		}
	};

	const validateURL = (url: string) => {
		const urlPattern =
			/^https?:\/\/[^\/]+\/.*\.(jpg|jpeg|png|gif|webp|svg|webm|ogg|ogv|mov|mp4)(?=$|\?|#)/;
		const isValidURL = urlPattern.test(url);
		return isValidURL;
	};

	const validateMemoryForm = () => {
		const errorStates = {
			medium: false,
			author: false,
			message: false,
			file: false,
		};

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
			if (!uploadedFile && memoryFormData.medium === "image") {
				console.error("Missing image file");
				alertMessage += "\nMissing image field";
				errorStates.file = true;
			} else if (!uploadedFile && memoryFormData.medium === "video") {
				console.error("Missing video file");
				alertMessage += "\nMissing video field";
				errorStates.file = true;
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
								validation={{ required: true, isInvalid: memoryErrors.medium }}
								value={memoryFormData?.medium}
							/>
							{(memoryFormData?.medium === "image" ||
								memoryFormData?.medium === "video") && (
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
							{memoryFormData?.medium === "text" && (
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
						{memoryFormData?.medium === "" && (
							<div className="memory-modal__filler"></div>
						)}
						{memoryFormData?.medium === "image" &&
							(memoryModalMode === "add" || memoryModalMode === "edit") && (
								<UploadField
									uploadLabel="Image"
									uploadId="memory_image"
									uploadName="url"
									onFileChange={uploadMedia}
									fileUrl={memoryFormData.url || ""}
									uploadType="image"
								/>
							)}
						{memoryFormData?.medium === "image" &&
							memoryModalMode === "read" && (
								<div className="memory-modal__container">
									{isMemoryFormEditable ? (
										<UploadField
											uploadLabel="Image"
											uploadId="memory_image"
											uploadName="url"
											onFileChange={uploadMedia}
											fileUrl={memoryFormData.url || ""}
											uploadType="image"
										/>
									) : !isMemoryFormEditable && memoryFormData.url ? (
										<>
											<p className="memory-modal__label text-label">Image</p>
											<img
												className="memory-modal__image"
												src={memoryFormData.url}
												alt={`Memory image by ${memoryFormData.author}`}
											/>
										</>
									) : (
										<>
											<p className="memory-modal__label text-label">Image</p>
											<div className="memory-modal__media-container text-body">
												No image selected, please upload an image
											</div>
										</>
									)}
								</div>
							)}
						{memoryFormData?.medium === "video" &&
							(memoryModalMode === "add" || memoryModalMode === "edit") && (
								<UploadField
									uploadLabel="Video"
									uploadId="memory_video"
									uploadName="url"
									onFileChange={uploadMedia}
									fileUrl={memoryFormData.url || ""}
									uploadType="video"
									acceptedTypes={{
										"video/mp4": [".mp4"],
										"video/webm": [".webm"],
										"video/ogg": [".ogg", ".ogv"],
										"video/quicktime": [".mov"],
									}}
								/>
							)}
						{memoryFormData?.medium === "video" &&
							memoryModalMode === "read" && (
								<div className="memory-modal__container">
									{isMemoryFormEditable ? (
										<UploadField
											uploadLabel="Video"
											uploadId="memory_video"
											uploadName="url"
											onFileChange={uploadMedia}
											fileUrl={memoryFormData.url || ""}
											uploadType="video"
											acceptedTypes={{
												"video/mp4": [".mp4"],
												"video/webm": [".webm"],
												"video/ogg": [".ogg", ".ogv"],
												"video/quicktime": [".mov"],
											}}
										/>
									) : !isMemoryFormEditable && memoryFormData.url ? (
										<>
											<p className="memory-modal__label text-label">Video</p>
											<video
												className="memory-modal__video"
												src={memoryFormData?.url}
												controls
											></video>
										</>
									) : (
										<>
											<p className="memory-modal__label text-label">Video</p>
											<div className="memory-modal__media-container text-body">
												No video selected, please upload a video
											</div>
										</>
									)}
								</div>
							)}
						{memoryFormData?.medium === "text" && (
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
						) : memoryModalMode === "edit" && isMemoryFormEditable ? (
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
