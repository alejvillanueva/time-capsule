import "./Button.scss";

interface ButtonProp {
	buttonType?: string;
	buttonText: string;
}

function Button({ buttonType, buttonText }: ButtonProp) {
	return (
		<button className="button text-body" type="button">
			{buttonText}
		</button>
	);
}

export default Button;
