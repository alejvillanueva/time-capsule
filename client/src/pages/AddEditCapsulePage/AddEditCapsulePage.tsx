import "./AddEditCapsulePage.scss";
import Button from "../../components/Button/Button";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import InputField from "../../components/InputField/InputField";
import MainHeading from "../../components/MainHeading/MainHeading";
import MemoryCard from "../../components/MemoryCard/MemoryCard";
import MemoryModal from "../../components/MemoryModal/MemoryModal";
import UploadField from "../../components/UploadField/UploadField";
import Loader from "../../components/Loader/Loader";
import useAppContext from "../../context/useAppContext";
import { Capsule, Memory } from "../../interfaces/index";
import { createCapsule, getCapsule, updateCapsule } from "../../services/index";
import { FileWithPath } from "react-dropzone";
import { uploadFile, deleteFile } from "../../utils/media";
import {
	useLocation,
	matchPath,
	useNavigate,
	useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";

interface CapsuleWithMemories extends Omit<Capsule, "open_date" | "edit_by"> {
	memories?: Memory[];
	edit_by: Date | null;
	open_date: Date | null;
}

interface CapsuleErrors {
	author: boolean;
	cover_art?: boolean;
	created_on?: boolean;
	edit_by: boolean;
	open_date: boolean;
	password?: boolean;
	title: boolean;
	updated_on?: boolean;
}

function AddEditCapsulePage() {
	const navigate = useNavigate();
	const { capsuleId } = useParams();
	const {
		isFormEditable,
		setIsFormEditable,
		setIsMemoryFormEditable,
		isModalOpen,
		setIsModalOpen,
		isDeleteModalOpen,
		setIsDeleteModalOpen,
		uploadedFile,
		setUploadedFile,
		memoryModalMode,
		isMemoryDeleteModalOpen,
		setIsMemoryDeleteModalOpen,
	} = useAppContext();

	const [currentMemoryId, setCurrentMemoryId] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [capsuleFormData, setCapsuleFormData] = useState<CapsuleWithMemories>({
		author: "",
		cover_art: "",
		created_on: new Date(),
		edit_by: null,
		open_date: null,
		password: "",
		title: "",
		updated_on: new Date(),
	});
	const [capsuleErrors, setCapsuleErrors] = useState<CapsuleErrors>({
		author: false,
		cover_art: false,
		created_on: false,
		edit_by: false,
		open_date: false,
		password: false,
		title: false,
		updated_on: false,
	});

	const addCapsule = async (capsule: Capsule) => {
		try {
			const newCapsule = await createCapsule(capsule);
			if (newCapsule[0].id) {
				setCapsuleErrors({
					author: false,
					cover_art: false,
					created_on: false,
					edit_by: false,
					open_date: false,
					password: false,
					title: false,
					updated_on: false,
				});
				navigate(`/capsule/${newCapsule[0].id}/edit`);
				alert("Capsule created successfully!");
			}
		} catch (error) {
			console.error("Adding capsule error:", error);
		}
	};

	const fetchCapsule = async (id: number) => {
		try {
			const [data] = await getCapsule(id);

			setCapsuleFormData(data);
		} catch (error) {
			console.error("Fetching capsule error:", error);
		}
	};

	useEffect(() => {
		if (capsuleId) fetchCapsule(Number(capsuleId));
	}, [capsuleId, isModalOpen, isDeleteModalOpen, isFormEditable]);

	const editCapsule = async (capsule: CapsuleWithMemories) => {
		try {
			// Remove "memories" property and update "updated_on" property during PUT request
			const { memories, ...editedCapsule } = capsule;
			editedCapsule.updated_on = new Date();

			// Type assertion since validation guarantees these are not null
			const putReadyCapsule = {
				...editedCapsule,
				edit_by: editedCapsule.edit_by as Date,
				open_date: editedCapsule.open_date as Date,
			};

			await updateCapsule(putReadyCapsule);

			fetchCapsule(Number(capsule.id));
		} catch (error) {
			console.error("Updating capsule error:", error);
		}
	};

	const { pathname } = useLocation();

	const addMatch = matchPath("/capsule/add", pathname);
	const editMatch = matchPath("/capsule/:capsuleId/edit", pathname);

	useEffect(() => {
		// Always allow form editing on add capsule path (vs. having disabled input fields)
		if (addMatch) setIsFormEditable(true);
	}, [pathname]);

	useEffect(() => {
		// Disable form editing when memory modal is closed
		if (!isModalOpen && editMatch) {
			setIsFormEditable(false);
			setIsMemoryFormEditable(false);
		}

		if (isModalOpen && memoryModalMode === "add") setIsMemoryFormEditable(true);
	}, [isModalOpen]);

	useEffect(() => {}, [isLoading]);

	const handleDeleteModalClick = () => {
		if (isModalOpen) {
			setIsMemoryDeleteModalOpen(true);
		} else {
			setIsDeleteModalOpen(true);
		}
	};

	const handleMemoryModalClick = () => {
		setIsModalOpen(true);
	};

	const handleCapsuleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = e.target;
		setCapsuleFormData({ ...capsuleFormData, [name]: value });
	};

	const handleCapsuleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateCapsuleForm()) return;

		const removeFile = async () => {
			if (capsuleFormData.cover_art) {
				try {
					setIsLoading(true);
					const mediaDeleteStatus = await deleteFile(
						capsuleFormData.cover_art,
						"image",
					);

					if (mediaDeleteStatus === "Success") capsuleFormData.cover_art = "";
				} catch (error) {
					console.error("Error removing cover art:", error);
				} finally {
					setIsLoading(false);
				}
			}
		};

		await removeFile();

		if (uploadedFile) {
			try {
				await removeFile();

				setIsLoading(true);
				const mediaURL = await uploadFile(uploadedFile);
				capsuleFormData.cover_art = mediaURL;
			} catch (error) {
				console.error("Error uploading cover art:", error);
			} finally {
				setIsLoading(false);
			}
		}

		// Transform the form data to match API expectations
		const apiReadyCapsule = {
			...capsuleFormData,
			edit_by: capsuleFormData.edit_by as Date,
			open_date: capsuleFormData.open_date as Date,
		};

		setIsFormEditable(false);
		if (addMatch) {
			await addCapsule(apiReadyCapsule);
		} else {
			await editCapsule(apiReadyCapsule);
		}
	};

	const validateCapsuleForm = () => {
		const errorStates = {
			author: false,
			cover_art: false,
			created_on: false,
			edit_by: false,
			open_date: false,
			password: false,
			title: false,
			updated_on: false,
		};

		let alertMessage = "Please revise the following errors before submitting:";

		// Author field
		if (!capsuleFormData.author) {
			console.error("Missing author field");
			alertMessage += "\nMissing author field";
			errorStates.author = true;
		} else if (capsuleFormData.author.length < 3) {
			console.error("Author must contain min. 3 characters");
			alertMessage += "\nAuthor must contain min. 3 characters";
			errorStates.author = true;
		}

		// Edit by field
		if (!capsuleFormData.edit_by) {
			console.error("Missing edit by date field");
			alertMessage += "\nMissing edit by date field";
			errorStates.edit_by = true;
		} else if (capsuleFormData.edit_by <= new Date()) {
			console.error("Invalid edit by date");
			alertMessage += "\nInvalid edit by date";
			errorStates.edit_by = true;
		}

		// Open date field
		if (!capsuleFormData.open_date) {
			console.error("Missing open date field");
			alertMessage += "\nMissing open date field";
			errorStates.open_date = true;
		} else if (capsuleFormData.open_date <= new Date()) {
			console.error("Invalid open date");
			alertMessage += "\nInvalid open date";
			errorStates.open_date = true;
		} else if (
			capsuleFormData.edit_by &&
			capsuleFormData.edit_by >= capsuleFormData.open_date
		) {
			console.error("Open date must follow the edit date");
			alertMessage += "\nOpen date must follow the edit date";
			errorStates.edit_by = true;
			errorStates.open_date = true;
		}

		// Title field
		if (!capsuleFormData.title) {
			console.error("Missing title field");
			alertMessage += "\nMissing title field";
			errorStates.title = true;
		} else if (capsuleFormData.title.length < 5) {
			console.error("Title must contain min. 5 characters");
			alertMessage += "\nTitle must contain min. 5 characters";
			errorStates.title = true;
		}

		// Optional data
		if (capsuleFormData.password && capsuleFormData.password.length < 8) {
			console.error("Password must contain min. 8 characters");
			alertMessage += "\nPassword must contain min. 8 characters";
			errorStates.password = true;
		}

		if (Object.values(errorStates).includes(true)) {
			alert(alertMessage);
			setCapsuleErrors(errorStates);
			return false;
		}

		return true;
	};

	const formatDate = (date: Date | string | null) => {
		if (!date) return "";

		if (typeof date === "string") {
			// If it's a full ISO string, extract just the date part
			if (date.includes("T")) {
				return date.split("T")[0];
			}

			return date;
		}

		if (date instanceof Date) return date.toISOString().slice(0, 10);

		return "";
	};

	const mediumPriority = {
		video: 0,
		image: 1,
		text: 2,
	};

	const uploadMedia = async (files: FileWithPath[]) => {
		const file = files[0];
		setUploadedFile(file);
	};

	return (
		<main className="add-edit-capsule">
			{isLoading && <Loader />}
			<form className="add-edit-capsule__form" onSubmit={handleCapsuleSubmit}>
				<div className="add-edit-capsule__form-container">
					{addMatch && (
						<UploadField
							uploadLabel="Cover Art"
							uploadName="cover_art"
							uploadId="cover_art"
							fileUrl={capsuleFormData.cover_art}
							onFileChange={uploadMedia}
							uploadType="cover"
						/>
					)}
					{editMatch && (
						<div className="add-edit-capsule__container add-edit-capsule__container--cover-art text-body">
							{isFormEditable ? (
								<UploadField
									uploadLabel="Cover Art"
									uploadName="cover_art"
									uploadId="cover_art"
									fileUrl={capsuleFormData.cover_art}
									onFileChange={uploadMedia}
									uploadType="cover"
								/>
							) : !isFormEditable && capsuleFormData.cover_art ? (
								<>
									<p className="add-edit-capsule__label text-label">
										Cover Art
									</p>
									<img
										className="add-edit-capsule__cover-art"
										src={capsuleFormData.cover_art}
										alt={`Cover art image for ${capsuleFormData.title}`}
									/>
								</>
							) : (
								<>
									<p className="add-edit-capsule__label text-label">
										Cover Art
									</p>
									<div className="add-edit-capsule__cover-art-container text-body">
										No cover art
									</div>
								</>
							)}
						</div>
					)}
					<div className="add-edit-capsule__input-container">
						<InputField
							inputType="text"
							inputLabel="Title"
							inputName="title"
							inputId="capsule
					_title"
							placeholder="Type the capsule title"
							handleChange={handleCapsuleChange}
							validation={{ required: true, isInvalid: capsuleErrors.title }}
							value={capsuleFormData.title}
						/>
						<InputField
							inputType="text"
							inputLabel="Author"
							inputName="author"
							inputId="capsule
					_author"
							placeholder="Type your name"
							handleChange={handleCapsuleChange}
							validation={{ required: true, isInvalid: capsuleErrors.author }}
							value={capsuleFormData.author}
						/>
						<InputField
							inputType="date"
							inputLabel="Capsule Opens"
							inputName="open_date"
							inputId="capsule
					_open_date"
							handleChange={handleCapsuleChange}
							validation={{
								required: true,
								isInvalid: capsuleErrors.open_date,
							}}
							value={
								capsuleFormData?.open_date
									? formatDate(capsuleFormData.open_date)
									: ""
							}
						/>
						<InputField
							inputType="password"
							inputLabel="Editing Password"
							inputName="password"
							inputId="capsule
							_password"
							placeholder="Type the password to edit capsule"
							handleChange={handleCapsuleChange}
							validation={{ required: false }}
							value={capsuleFormData.password}
						/>
						<InputField
							inputType="date"
							inputLabel="Editing Closes"
							inputName="edit_by"
							inputId="capsule
							_edit_by"
							handleChange={handleCapsuleChange}
							validation={{ required: true, isInvalid: capsuleErrors.edit_by }}
							value={
								capsuleFormData?.edit_by
									? formatDate(capsuleFormData.edit_by)
									: ""
							}
						/>
					</div>
				</div>
				<div className="add-edit-capsule__form-container">
					{addMatch ? (
						<MainHeading
							headingType="default"
							title="Create Time Capsule"
							resourceType="capsule"
							showIcons={true}
						/>
					) : editMatch && isFormEditable ? (
						<MainHeading
							headingType="custom-editable"
							title={capsuleFormData.title}
							resourceType="capsule"
							showIcons={true}
						/>
					) : (
						<MainHeading
							headingType="custom"
							title={capsuleFormData.title}
							resourceType="capsule"
							showIcons={true}
							handleModalClick={handleDeleteModalClick}
						/>
					)}
				</div>
			</form>

			{editMatch && (
				<>
					<h2 className="add-edit-capsule__subtitle text-subheading">
						Memories
					</h2>
					<ul className="add-edit-capsule__list">
						<MemoryCard
							cardType="add"
							handleModalClick={handleMemoryModalClick}
						/>
						{capsuleFormData.memories &&
							capsuleFormData.memories[0].author &&
							capsuleFormData.memories
								.sort(
									(a, b) =>
										mediumPriority[a.medium] - mediumPriority[b.medium] ||
										a.author.localeCompare(b.author),
								)
								.map((memory, i) => (
									<MemoryCard
										key={i}
										cardType="memory"
										handleModalClick={handleMemoryModalClick}
										setCurrentMemoryId={setCurrentMemoryId}
										memory={memory}
									/>
								))}
					</ul>
				</>
			)}
			<div className="add-edit-capsule__button-container">
				{editMatch && (
					<>
						<Button buttonText="Sort" />
						<Button buttonText="Filter" />
					</>
				)}
			</div>
			{!isModalOpen && !isMemoryDeleteModalOpen && (
				<DeleteModal
					title={capsuleFormData.title}
					resourceType="capsule"
					coverUrl={capsuleFormData.cover_art}
					memories={capsuleFormData.memories}
				/>
			)}
			<MemoryModal
				fetchCapsule={fetchCapsule}
				memoryId={currentMemoryId}
				handleDeleteModalClick={handleDeleteModalClick}
			/>
		</main>
	);
}

export default AddEditCapsulePage;
