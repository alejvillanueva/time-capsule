import "./InputField.scss";
import useAppContext from "../../context/useAppContext";

interface InputFieldProps {
	inputLabel: string;
	inputType: "text" | "date" | "password" | "textArea" | "select";
	inputName: string;
	inputId: string;
	placeholder?: string;
}

function InputField({
	inputLabel,
	inputType,
	inputId,
	inputName,
	placeholder,
}: InputFieldProps) {
	const { isEditable } = useAppContext();

	return (
		<>
			{inputType !== "select" && inputType !== "textArea" && (
				<>
					<label className="input-field__label text-label" htmlFor={inputId}>
						{inputLabel}
					</label>
					<input
						className="input-field__input"
						type={inputType}
						name={inputName}
						id={inputId}
						placeholder={placeholder}
						disabled={!isEditable}
					/>
				</>
			)}
			{inputType === "select" && (
				<>
					<label className="input-field__label text-label" htmlFor={inputId}>
						{inputLabel}
					</label>
					<select
						className="input-field__input input-field__input--select"
						name={inputName}
						id={inputId}
						disabled={!isEditable}
					>
						<option value="">Select a Memory Type</option>
						<option value="image">Image</option>
						<option value="video">Video</option>
						<option value="text">Text</option>
					</select>
				</>
			)}
			{inputType === "textArea" && (
				<>
					<label className="input-field__label text-label" htmlFor={inputId}>
						{inputLabel}
					</label>
					<textarea
						className="input-field__input input-field__input--textarea"
						name={inputName}
						id={inputId}
						placeholder={placeholder}
						disabled={!isEditable}
					></textarea>
				</>
			)}
		</>
	);
}

export default InputField;
