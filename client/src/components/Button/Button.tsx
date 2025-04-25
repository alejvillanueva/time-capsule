import "./Button.scss";

interface ButtonProps {
	buttonType?: string;
	buttonText: string;
}

function Button({ buttonType, buttonText }: ButtonProps) {
	return (
		<button className="button text-label" type="button">
			{buttonText}
		</button>
	);
}

export default Button;
