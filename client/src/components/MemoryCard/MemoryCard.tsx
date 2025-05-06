import "./MemoryCard.scss";

interface MemoryCardProps {
	cardType: "add" | "memory";
	handleModalClick?: () => void;
}

function MemoryCard({ cardType, handleModalClick }: MemoryCardProps) {
	return (
		<>
			{cardType === "add" && (
				<li
					className="memory-card memory-card--add"
					data-type="add"
					onClick={handleModalClick}
				>
					<div className="memory-card__container memory-card__container--add">
						<div className="memory-card__icon-container">
							<svg
								className="memory-card__icon"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#d14200"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M5 12h14" />
								<path d="M12 5v14" />
							</svg>
						</div>
						<p className="memory-card__title memory-card__title--add">
							Create Memory
						</p>
					</div>
				</li>
			)}
			{cardType === "memory" && (
				<li
					className="memory-card"
					data-type="memory"
					onClick={handleModalClick}
				>
					<div className="memory-card__container">
						<div className="memory-card__card-container">
							{/* add conditional for each media type to show */}
							<img
								className="memory-card__image"
								src="https://blog.adobe.com/en/topics/media_1b0bc6f8d7d4e93986294e9b25e41afd86c6c4822.jpeg?width=750&format=jpeg&optimize=medium"
								alt=""
							/>
						</div>
						<div className="memory-card__card-container">
							<h2 className="memory-card__title ">
								Lorem ipsum dolor sit amet
							</h2>
						</div>
					</div>
				</li>
			)}
		</>
	);
}

export default MemoryCard;
