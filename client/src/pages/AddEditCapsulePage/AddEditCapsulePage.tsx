import "./AddEditCapsulePage.scss";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import MainHeading from "../../components/MainHeading/MainHeading";
import MemoryCard from "../../components/MemoryCard/MemoryCard";
import UploadField from "../../components/UploadField/UploadField";
import useAppContext from "../../context/useAppContext";
import { useLocation, matchPath, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createCapsule } from "../../services/index";
import { Capsule } from "../../interfaces/index";
import MemoryModal from "../../components/MemoryModal/MemoryModal";

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
			console.error("Error adding/updating capsule:", error);
		}
	};

	const { pathname } = useLocation();

	const addMatch = matchPath("/capsule/add", pathname);
	const editMatch = matchPath("/capsule/:capsuleId/edit", pathname);

	useEffect(() => {
		// always allow form editing on add capsule path
		addMatch ? setIsCapsuleEditable(true) : setIsCapsuleEditable(false);
	}, [pathname]);

	const handleModalClick = () => {
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
		await addCapsule(capsuleFormData);
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
						/>
						<InputField
							inputType="date"
							inputLabel="Editing Closes"
							inputName="edit_by"
							inputId="capsule
					_edit_by"
							handleChange={handleCapsuleChange}
							validation={{ required: true, isInvalid: capsuleErrors.edit_by }}
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
							title="Lorem Ipsum"
							resourceType="capsule"
							showIcons={true}
						/>
					) : (
						<MainHeading
							headingType="custom"
							title="Lorem Ipsum"
							resourceType="capsule"
							showIcons={true}
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
						<MemoryCard cardType="add" handleModalClick={handleModalClick} />
						{editMatch && (
							// pass prop with name, if name doesnt exist, show add
							<>
								<MemoryCard
									cardType="memory"
									handleModalClick={handleModalClick}
								/>
								<MemoryCard
									cardType="memory"
									handleModalClick={handleModalClick}
								/>
								<MemoryCard
									cardType="memory"
									handleModalClick={handleModalClick}
								/>
								<MemoryCard
									cardType="memory"
									handleModalClick={handleModalClick}
								/>
								<MemoryCard
									cardType="memory"
									handleModalClick={handleModalClick}
								/>
								<MemoryCard
									cardType="memory"
									handleModalClick={handleModalClick}
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
			<MemoryModal memoryTitle={`Lorem Ipsum Test`} />
		</main>
	);
}

export default AddEditCapsulePage;
