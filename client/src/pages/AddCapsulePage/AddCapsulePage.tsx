import "./AddCapsulePage.scss";
import InputField from "../../components/InputField/InputField";
import MainHeading from "../../components/MainHeading/MainHeading";
import UploadField from "../../components/UploadField/UploadField";
import MemoryCard from "../../components/MemoryCard/MemoryCard";
import useAppContext from "../../context/useAppContext";

function AddCapsulePage() {
	const { coverArt, setCoverArt, setIsEditable } = useAppContext();

	// always allow form editing on this page
	setIsEditable(true);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	// setCoverArt();

	return (
		<main className="add-capsule">
			<form className="add-capsule__form" onSubmit={handleSubmit}>
				<UploadField
					uploadLabel="Cover Art"
					uploadName="capsule_image"
					uploadId="capsule_image"
				/>
				<div className="add-capsule__form-container">
					<InputField
						inputType="text"
						inputLabel="Title"
						inputName="capsule_title"
						inputId="capsule
					_title"
						placeholder="Type the capsule title"
					/>
					<InputField
						inputType="text"
						inputLabel="Author"
						inputName="capsule_author"
						inputId="capsule
					_author"
						placeholder="Type your name"
					/>
					<InputField
						inputType="date"
						inputLabel="Capsule Opens"
						inputName="capsule_unlock_date"
						inputId="capsule
					_unlock_date"
					/>
					<InputField
						inputType="password"
						inputLabel="Editing Password"
						inputName="capsule_password"
						inputId="capsule
					_password"
						placeholder="Type the password to edit capsule"
					/>
					<InputField
						inputType="date"
						inputLabel="Editing Closes"
						inputName="capsule_edit_date"
						inputId="capsule
					_edit_date"
					/>
				</div>
			</form>
			<MainHeading headingType="default" title="Create Time Capsule" />
			<h2 className="add-capsule__subtitle text-subheading">Memories</h2>
			<ul className="add-capsule__list">
				<MemoryCard cardType="add" />
			</ul>
		</main>
	);
}

export default AddCapsulePage;
