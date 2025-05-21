import "./AddEditCapsulePage.scss";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import MainHeading from "../../components/MainHeading/MainHeading";
import MemoryCard from "../../components/MemoryCard/MemoryCard";
import UploadField from "../../components/UploadField/UploadField";
import useAppContext from "../../context/useAppContext";
import { useLocation, matchPath, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MemoryModal from "../../components/MemoryModal/MemoryModal";

interface Errors {
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
	// const navigate = useNavigate();
	const {
		coverArt,
		setCoverArt,
		isCapsuleEditable,
		setIsCapsuleEditable,
		setIsOpen,
		setMemoryModal,
		capsuleFormData,
		setCapsuleFormData,
		uploadedFile,
		setUploadedFile,
	} = useAppContext();
	const [errors, setErrors] = useState<Errors>({
		author: false,
		cover_art: false,
		created_on: false,
		edit_by: false,
		open_date: false,
		password: false,
		title: false,
		updated_on: false,
	});

	const {
		author,
		cover_art,
		created_on,
		edit_by,
		open_date,
		password,
		title,
		updated_on,
	} = capsuleFormData;

	const { pathname } = useLocation();

	const addMatch = matchPath("/capsule/add", pathname);
	const editMatch = matchPath("/capsule/:capsuleId/edit", pathname);

	useEffect(() => {
		// always allow form editing on add capsule path
		if (addMatch) setIsCapsuleEditable(true);
	}, [pathname]);

	const handleModalClick = () => {
		setIsOpen(true);
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = e.target;

		setCapsuleFormData({ ...capsuleFormData, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateForm()) return;

		if (!uploadedFile) {
			console.log("No file uploaded");
			return;
		}
		console.log("Uploaded file:", uploadedFile[0]);

		try {
			// Update - replace line below with http request function
			console.log(capsuleFormData);

			// Update - find capsule id and uncomment line below
			// navigate(`/capsule/${capsuleId}/edit`)
		} catch (error) {
			console.error("Error creating/updating capsule:", error);
		}
	};

	const validateForm = () => {
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
		if (!author) {
			console.error("Missing author field");
			errorStates.author = true;
		} else if (author.length < 3) {
			console.error("Author must contain min. 3 characters");
			errorStates.author = true;
		}

		// Edit by field
		if (!edit_by) {
			console.error("Missing edit by date field");
			errorStates.edit_by = true;
		} else if (edit_by <= new Date()) {
			console.error("Invalid edit by date");
			errorStates.edit_by = true;
		}

		// Open date field
		if (!open_date) {
			console.error("Missing open date field");
			errorStates.open_date = true;
		} else if (open_date <= new Date()) {
			console.error("Invalid open date");
			errorStates.open_date = true;
		} else if (edit_by >= open_date) {
			console.error("Open date must follow the edit date");
			errorStates.edit_by = true;
			errorStates.open_date = true;
		}

		// Title field
		if (!title) {
			console.error("Missing title field");
			errorStates.title = true;
		} else if (title.length < 5) {
			console.error("Title must contain min. 5 characters");
			errorStates.title = true;
		}

		// Optional data
		if (password && password.length < 8) {
			console.error("Password must contain min. 8 characters");
			errorStates.password = true;
		}

		setErrors(errorStates);

		if (Object.values(errors).includes(true)) {
			return false;
		}

		return true;
	};

	return (
		<main className="add-edit-capsule">
			<form className="add-edit-capsule__form" onSubmit={handleSubmit}>
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
								{cover_art ? (
									<img
										className="add-edit-capsule__cover-art"
										src={cover_art}
										alt={`Cover art image for ${title}`}
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
							handleChange={handleChange}
							validation={{ required: true, isInvalid: errors.title }}
						/>
						<InputField
							inputType="text"
							inputLabel="Author"
							inputName="author"
							inputId="capsule
					_author"
							placeholder="Type your name"
							handleChange={handleChange}
							validation={{ required: true, isInvalid: errors.author }}
						/>
						<InputField
							inputType="date"
							inputLabel="Capsule Opens"
							inputName="open_date"
							inputId="capsule
					_open_date"
							handleChange={handleChange}
							validation={{ required: true, isInvalid: errors.open_date }}
						/>
						<InputField
							inputType="password"
							inputLabel="Editing Password"
							inputName="password"
							inputId="capsule
					_password"
							placeholder="Type the password to edit capsule"
							handleChange={handleChange}
							validation={{ required: false }}
						/>
						<InputField
							inputType="date"
							inputLabel="Editing Closes"
							inputName="edit_by"
							inputId="capsule
					_edit_by"
							handleChange={handleChange}
							validation={{ required: true, isInvalid: errors.edit_by }}
						/>
					</div>
				</div>
				<div className="add-edit-capsule__form-container">
					{addMatch ? (
						<MainHeading
							headingType="default"
							title="Create Time Capsule"
							resourceType="capsule"
						/>
					) : editMatch && isCapsuleEditable ? (
						<MainHeading
							headingType="custom-editable"
							title="Lorem Ipsum"
							resourceType="capsule"
						/>
					) : (
						<MainHeading
							headingType="custom"
							title="Lorem Ipsum"
							resourceType="capsule"
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
				{/* add conditional to show buttons below if memory card (with cardType="memory") map length is greater than 0 and editMatch is true */}
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
