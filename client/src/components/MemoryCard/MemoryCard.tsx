import "./MemoryCard.scss";
import { Dispatch, SetStateAction } from "react";
import { Memory } from "../../interfaces/index";
import useAppContext from "../../context/useAppContext";

interface MemoryCardProps {
	cardType: "add" | "memory";
	handleModalClick?: () => void;
	setCurrentMemoryId?: Dispatch<SetStateAction<number | null>>;
	memory?: Memory;
}

function MemoryCard({
	cardType,
	handleModalClick,
	setCurrentMemoryId,
	memory,
}: MemoryCardProps) {
	const { setMemoryModalMode } = useAppContext();

	const handleCardClick = (mode: "add" | "edit" | "read" | null) => {
		if (handleModalClick) handleModalClick();
		if (mode !== "add" && memory?.id && setCurrentMemoryId)
			setCurrentMemoryId(() => Number(memory.id));
		setMemoryModalMode(mode);
	};

	return (
		<>
			{cardType === "add" && (
				<li
					className="memory-card memory-card--add"
					data-type="add"
					onClick={() => handleCardClick("add")}
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
						<p className="memory-card__title">Create Memory</p>
					</div>
				</li>
			)}
			{cardType === "memory" && (
				<li
					className="memory-card"
					data-type="memory"
					onClick={() => handleCardClick("read")}
				>
					<div className="memory-card__container">
						<div className="memory-card__card-container">
							{memory?.url && memory?.medium === "image" ? (
								<img
									className="memory-card__image"
									src={memory?.url}
									alt={memory?.message ?? `Image authored by ${memory.author}`}
								/>
							) : memory?.url && memory?.medium === "video" ? (
								<video className="memory-card__video" src={memory?.url}></video>
							) : (
								<p className="memory-card__message">
									{memory?.message && memory?.message?.length > 200
										? memory?.message?.slice(0, 200) + "..."
										: memory?.message}
								</p>
							)}
						</div>
						<div className="memory-card__card-container">
							<h3 className="memory-card__author text-label">
								{memory?.author}
							</h3>
							<p className="memory-card__medium text-label">{memory?.medium}</p>
						</div>
					</div>
				</li>
			)}
		</>
	);
}

export default MemoryCard;
