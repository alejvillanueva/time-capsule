import "./EditCapsulePage.scss";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import MainHeading from "../../components/MainHeading/MainHeading";
import MemoryCard from "../../components/MemoryCard/MemoryCard";
import useAppContext from "../../context/useAppContext";

function EditCapsulePage() {
	const { isEditable, setIsEditable } = useAppContext();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<main className="edit-capsule">
			<form className="edit-capsule__form" onSubmit={handleSubmit}>
				<img
					className="edit-capsule__cover-art"
					src="https://images.pexels.com/photos/31009027/pexels-photo-31009027/free-photo-of-australian-shepherd-and-samoyed-playing-on-beach.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
					alt="To be replaced"
				/>
				<div className="edit-capsule__form-container">
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
			{isEditable ? (
				<MainHeading headingType="custom-editable" title="Lorem Ipsum" />
			) : (
				<MainHeading headingType="custom" title="Lorem Ipsum" />
			)}
			<h2 className="edit-capsule__subtitle text-subheading">Memories</h2>
			<ul className="edit-capsule__list">
				<MemoryCard cardType="add" />
				<MemoryCard cardType="memory" />
				<MemoryCard cardType="memory" />
				<MemoryCard cardType="memory" />
				<MemoryCard cardType="memory" />
				<MemoryCard cardType="memory" />
				<MemoryCard cardType="memory" />
			</ul>
			<div className="edit-capsule__button-container">
				{/* add conditional to show buttons below if memory card (with cardType="memory") map length is greater than 0 */}
				<Button buttonText="Sort" />
				<Button buttonText="Filter" />
			</div>
		</main>
	);
}

export default EditCapsulePage;
