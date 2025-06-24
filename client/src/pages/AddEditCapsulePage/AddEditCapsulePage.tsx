import "./AddEditCapsulePage.scss";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import MainHeading from "../../components/MainHeading/MainHeading";
import MemoryCard from "../../components/MemoryCard/MemoryCard";
import UploadField from "../../components/UploadField/UploadField";
import useAppContext from "../../context/useAppContext";
import {
	useLocation,
	matchPath,
	useNavigate,
	useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { createCapsule, getCapsule, updateCapsule } from "../../services/index";
import { Capsule } from "../../interfaces/index";
import MemoryModal from "../../components/MemoryModal/MemoryModal";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

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
		coverArt,
		setCoverArt,
		isCapsuleEditable,
		setIsCapsuleEditable,
		setIsModalOpen,
		setMemoryModal,
		memoryFormData,
		setMemoryFormData,
		uploadedFile,
		setUploadedFile,
	} = useAppContext();

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const [capsuleData, setCapsuleData] = useState<Capsule>({
		author: "",
		cover_art: "",
		created_on: new Date(),
		edit_by: new Date(),
		open_date: new Date(),
		password: "",
		title: "",
		updated_on: new Date(),
	});
	const [capsuleFormData, setCapsuleFormData] = useState<Capsule>({
		author: "",
		cover_art: "",
		created_on: new Date(),
		edit_by: new Date(),
		open_date: new Date(),
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
			if (newCapsule[0].id) navigate(`/capsule/${newCapsule[0].id}/edit`);
		} catch (error) {
			console.error("Error adding capsule:", error);
		}
	};

	const fetchCapsule = async (id: number) => {
		try {
			const [data] = await getCapsule(id);

			setCapsuleData(data);
		} catch (error) {
			console.error("Error fetching capsule:", error);
		}
	};

	useEffect(() => {
		fetchCapsule(Number(capsuleId));
	}, [capsuleId]);

	const editCapsule = async (capsule: Capsule) => {
		try {
			await updateCapsule(capsule);
		} catch (error) {
			console.error("Error updating capsule:", error);
		}
	};

	const { pathname } = useLocation();

	const addMatch = matchPath("/capsule/add", pathname);
	const editMatch = matchPath("/capsule/:capsuleId/edit", pathname);

	useEffect(() => {
		// always allow form editing on add capsule path (vs. having disabled input fields)
		addMatch ? setIsCapsuleEditable(true) : setIsCapsuleEditable(false);
	}, [pathname]);

	const handleDeleteModalClick = () => {
		setIsDeleteModalOpen(true);
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

		// TODO: update logic for upload file
		if (!uploadedFile) {
			console.log("No file uploaded");
			// return;
		} else {
			console.log("Uploaded file:", uploadedFile[0]);
		}

		setIsCapsuleEditable(false);
		if (addMatch) {
			await addCapsule(capsuleFormData);
		} else {
			await editCapsule(capsuleFormData);
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

		// Author field
		if (!capsuleFormData.author) {
			console.error("Missing author field");
			errorStates.author = true;
		} else if (capsuleFormData.author.length < 3) {
			console.error("Author must contain min. 3 characters");
			errorStates.author = true;
		}

		// Edit by field
		if (!capsuleFormData.edit_by) {
			console.error("Missing edit by date field");
			errorStates.edit_by = true;
		} else if (capsuleFormData.edit_by <= new Date()) {
			console.error("Invalid edit by date");
			errorStates.edit_by = true;
		}

		// Open date field
		if (!capsuleFormData.open_date) {
			console.error("Missing open date field");
			errorStates.open_date = true;
		} else if (capsuleFormData.open_date <= new Date()) {
			console.error("Invalid open date");
			errorStates.open_date = true;
		} else if (capsuleFormData.edit_by >= capsuleFormData.open_date) {
			console.error("Open date must follow the edit date");
			errorStates.edit_by = true;
			errorStates.open_date = true;
		}

		// Title field
		if (!capsuleFormData.title) {
			console.error("Missing title field");
			errorStates.title = true;
		} else if (capsuleFormData.title.length < 5) {
			console.error("Title must contain min. 5 characters");
			errorStates.title = true;
		}

		// Optional data
		if (capsuleFormData.password && capsuleFormData.password.length < 8) {
			console.error("Password must contain min. 8 characters");
			errorStates.password = true;
		}

		setCapsuleErrors(errorStates);

		if (Object.values(capsuleErrors).includes(true)) {
			return false;
		}

		return true;
	};

	let formattedDate;

	if (capsuleData.open_date && capsuleData.edit_by) {
		formattedDate = {
			open_date: capsuleData.open_date.toString().slice(0, 10),
			edit_by: capsuleData.edit_by.toString().slice(0, 10),
		};
	}

	return (
		<main className="add-edit-capsule">
			<form className="add-edit-capsule__form" onSubmit={handleCapsuleSubmit}>
				<div className="add-edit-capsule__form-container">
					{addMatch && (
						<UploadField
							uploadLabel="Cover Art"
							uploadName="cover_art"
							uploadId="cover_art"
							onFileChange={setUploadedFile}
						/>
					)}
					{editMatch && (
						<div className="add-edit-capsule__container">
							<p className="add-edit-capsule__label text-label">Cover Art</p>
							<div className="add-edit-capsule__cover-art-container text-body">
								{capsuleFormData.cover_art ? (
									<img
										className="add-edit-capsule__cover-art"
										src={capsuleFormData.cover_art}
										alt={`Cover art image for ${capsuleFormData.title}`}
									/>
								) : (
									"No cover art"
								)}
							</div>
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
							value={capsuleData.title}
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
							value={capsuleData.author}
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
							value={formattedDate?.open_date ? formattedDate.open_date : ""}
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
							value={capsuleData.password}
						/>
						<InputField
							inputType="date"
							inputLabel="Editing Closes"
							inputName="edit_by"
							inputId="capsule
							_edit_by"
							handleChange={handleCapsuleChange}
							validation={{ required: true, isInvalid: capsuleErrors.edit_by }}
							value={formattedDate?.edit_by ? formattedDate.edit_by : ""}
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
					) : editMatch && isCapsuleEditable ? (
						<MainHeading
							headingType="custom-editable"
							title={capsuleData.title}
							resourceType="capsule"
							showIcons={true}
						/>
					) : (
						<MainHeading
							headingType="custom"
							title={capsuleData.title}
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
						{editMatch && (
							// pass prop with name, if name doesnt exist, show add
							<>
								<MemoryCard
									cardType="memory"
									handleModalClick={handleMemoryModalClick}
								/>
								<MemoryCard
									cardType="memory"
									handleModalClick={handleMemoryModalClick}
								/>
								<MemoryCard
									cardType="memory"
									handleModalClick={handleMemoryModalClick}
								/>
								<MemoryCard
									cardType="memory"
									handleModalClick={handleMemoryModalClick}
								/>
								<MemoryCard
									cardType="memory"
									handleModalClick={handleMemoryModalClick}
								/>
								<MemoryCard
									cardType="memory"
									handleModalClick={handleMemoryModalClick}
								/>
							</>
						)}
					</ul>
				</>
			)}
			<div className="add-edit-capsule__button-container">
				{/* TODO: add conditional to show buttons below if memory card (with cardType="memory") map length is greater than 0 and editMatch is true */}
				{editMatch && (
					<>
						<Button buttonText="Sort" />
						<Button buttonText="Filter" />
					</>
				)}
			</div>
			<DeleteModal
				isModalOpen={isDeleteModalOpen}
				setIsModalOpen={setIsDeleteModalOpen}
				capsuleTitle={capsuleData.title}
			/>
			<MemoryModal memoryTitle={`Lorem Ipsum Test`} />
		</main>
	);
}

export default AddEditCapsulePage;
