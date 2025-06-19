import "./InputField.scss";
import useAppContext from "../../context/useAppContext";

interface InputFieldProps {
	inputLabel: string;
	inputType: "text" | "date" | "password" | "textArea" | "select";
	inputName: string;
	inputId: string;
	placeholder?: string;
	handleChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => void;
	validation: {
		required: boolean;
		isInvalid?: boolean | undefined;
	};
}

function InputField({
	inputLabel,
	inputType,
	inputId,
	inputName,
	placeholder,
	handleChange,
	validation,
}: InputFieldProps) {
	const { isCapsuleEditable, isModalOpen, isMemoryEditable } = useAppContext();

	return (
		<>
			{inputType !== "select" && inputType !== "textArea" && (
				<>
					<label className="input-field__label text-label" htmlFor={inputId}>
						{inputLabel}
					</label>
					{validation.required && validation.isInvalid && (
						<div className="input-field__error-container">
							<svg
								className="input-field__icon"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="#d10000"
								stroke="#ffffff"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="12" cy="12" r="10" />
								<line x1="12" x2="12" y1="8" y2="12" />
								<line x1="12" x2="12.01" y1="16" y2="16" />
							</svg>
							<span className="input-field__error-text">
								This field is required
							</span>
						</div>
					)}
					<input
						className="input-field__input"
						type={inputType}
						name={inputName}
						id={inputId}
						placeholder={placeholder}
						disabled={!isCapsuleEditable}
						onChange={handleChange}
					/>
				</>
			)}
			{inputType === "select" && (
				<>
					<label className="input-field__label text-label" htmlFor={inputId}>
						{inputLabel}
					</label>
					{validation.required && validation.isInvalid && (
						<div className="input-field__error-container">
							<svg
								className="input-field__icon"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="#d10000"
								stroke="#ffffff"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="12" cy="12" r="10" />
								<line x1="12" x2="12" y1="8" y2="12" />
								<line x1="12" x2="12.01" y1="16" y2="16" />
							</svg>
							<span className="input-field__error-text">
								This field is required
							</span>
						</div>
					)}
					<select
						className="input-field__input input-field__input--select"
						name={inputName}
						id={inputId}
						disabled={!isCapsuleEditable}
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
					{validation.required && validation.isInvalid && (
						<div className="input-field__error-container">
							<svg
								className="input-field__icon"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="#d10000"
								stroke="#ffffff"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="12" cy="12" r="10" />
								<line x1="12" x2="12" y1="8" y2="12" />
								<line x1="12" x2="12.01" y1="16" y2="16" />
							</svg>
							<span className="input-field__error-text">
								This field is required
							</span>
						</div>
					)}
					<textarea
						className="input-field__input input-field__input--textarea"
						name={inputName}
						id={inputId}
						placeholder={placeholder}
						disabled={!isCapsuleEditable}
						onChange={handleChange}
					></textarea>
				</>
			)}
		</>
	);
}

export default InputField;
