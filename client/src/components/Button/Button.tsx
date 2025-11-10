import "./Button.scss";

interface ButtonProps {
	buttonText: string;
	click?: () => void;
}

function Button({ buttonText, click }: ButtonProps) {
	return (
		<button className="button text-label" type="button" onClick={click}>
			{buttonText}
		</button>
	);
}

export default Button;
