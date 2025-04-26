import "./MainHeading.scss";

interface MainHeadingProps {
	headingType: "default" | "custom" | "custom-editable";
	title: string;
}

function MainHeading({ headingType, title }: MainHeadingProps) {
	return (
		<>
			{headingType === "default" && (
				<div className="main-heading">
					<h1 className="main-heading__title text-heading">{title}</h1>
					<div className="main-heading__icon-container">
						<svg
							className="main-heading__icon"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#757575"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M18 6 6 18" />
							<path d="m6 6 12 12" />
						</svg>
						<svg
							className="main-heading__icon"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#757575"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M20 6 9 17l-5-5" />
						</svg>
					</div>
				</div>
			)}
			{headingType === "custom" && (
				<div className="main-heading">
					<h1 className="main-heading__title text-heading-bold">{title}</h1>
					<div className="main-heading__icon-container">
						<svg
							className="main-heading__icon"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#757575"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
							<path d="m15 5 4 4" />
						</svg>
						<svg
							className="main-heading__icon"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#757575"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M3 6h18" />
							<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
							<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
							<line x1="10" x2="10" y1="11" y2="17" />
							<line x1="14" x2="14" y1="11" y2="17" />
						</svg>
					</div>
				</div>
			)}
			{headingType === "custom-editable" && (
				<div className="main-heading">
					<h1 className="main-heading__title text-heading-bold">{title}</h1>
					<div className="main-heading__icon-container">
						<svg
							className="main-heading__icon"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#757575"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M18 6 6 18" />
							<path d="m6 6 12 12" />
						</svg>
						<svg
							className="main-heading__icon"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#757575"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M20 6 9 17l-5-5" />
						</svg>
					</div>
				</div>
			)}
		</>
	);
}

export default MainHeading;
