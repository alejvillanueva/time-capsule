import "./Tooltip.scss";

interface TooltipProps {
	title: string;
	position?: "top" | "right" | "bottom" | "left";
}

function Tooltip({ title, position }: TooltipProps) {
	return (
		<div className="tooltip">
			<span
				className={`tooltip__text ${position ? "tooltip__text--" + position : ""} text-label`}
			>
				{title}
			</span>
		</div>
	);
}

export default Tooltip;
