import "./CapsuleCard.scss";
import { Link } from "react-router-dom";

interface CapsuleCardProps {
	cardType: "add" | "capsule";
}

function CapsuleCard({ cardType }: CapsuleCardProps) {
	return (
		<>
			{cardType === "add" && (
				<li className="capsule-card capsule-card--add">
					<Link
						className="capsule-card__link capsule-card__link--add"
						to="/capsule/add"
					>
						<div className="capsule-card__icon-container">
							<svg
								className="capsule-card__icon"
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
						<p className="capsule-card__title capsule-card__title--add">
							Create Time Capsule
						</p>
					</Link>
				</li>
			)}
			{cardType === "capsule" && (
				<li className="capsule-card">
					<Link className="capsule-card__link" to={``}>
						<div className="capsule-card__container">
							<img
								className="capsule-card__image"
								src="https://blog.adobe.com/en/topics/media_1b0bc6f8d7d4e93986294e9b25e41afd86c6c4822.jpeg?width=750&format=jpeg&optimize=medium"
								alt=""
							/>
						</div>
						<div className="capsule-card__container">
							<time
								className="capsule-card__date text-label"
								dateTime="2025-06-06"
							>
								06 Jun 25
							</time>
							<small className="capsule-card__author text-label">
								Jane Doe
							</small>
							<h2 className="capsule-card__title ">
								Lorem ipsum dolor sit amet
							</h2>
						</div>
					</Link>
				</li>
			)}
		</>
	);
}

export default CapsuleCard;
