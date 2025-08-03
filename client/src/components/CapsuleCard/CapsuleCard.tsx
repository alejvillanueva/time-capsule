import "./CapsuleCard.scss";
import { Link, useNavigate } from "react-router-dom";
import { Capsule } from "../../interfaces/index";
import React, { useEffect, useRef, useState } from "react";

interface CapsuleCardProps {
	cardType: "add" | "capsule";
	capsuleData?: Capsule;
}

function CapsuleCard({ cardType, capsuleData }: CapsuleCardProps) {
	const navigate = useNavigate();
	const optionRef = useRef<HTMLDivElement | null>(null);
	const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);
	let formattedDate;
	if (capsuleData) {
		formattedDate = new Date(capsuleData.open_date).toLocaleDateString(
			"en-GB",
			{
				day: "2-digit",
				month: "short",
				year: "2-digit",
			},
		);
	}

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (
				optionRef.current &&
				e.target instanceof Node &&
				!optionRef.current.contains(e.target)
			) {
				setIsOptionsVisible(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [optionRef]);

	const handleOptionsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOptionsVisible(!isOptionsVisible);
	};

	const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (capsuleData?.password) {
			navigate(`/capsule/${capsuleData?.id}/access`);
		} else {
			navigate(`/capsule/${capsuleData?.id}/edit`);
		}
	};

	const handleShareClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		// TODO: uncomment below and edit share link, add notification that it has been successfully copied
		// try {
		// 	navigator.clipboard.writeText(`/capsule/${capsuleData?.id}/unlocked`);
		// } catch (error) {
		// 	console.error("Failed to copy share link:", error);
		// }
	};

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
								className="capsule-card__icon capsule-card__icon--plus"
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
			{cardType === "capsule" && capsuleData && (
				<li className="capsule-card">
					<Link
						className="capsule-card__link"
						to={
							new Date() < new Date(capsuleData.open_date)
								? `/capsule/${capsuleData.id}/locked`
								: `/capsule/${capsuleData.id}/unlocked`
						}
					>
						<div className="capsule-card__container">
							<img
								className="capsule-card__image"
								src={
									capsuleData.cover_art
										? capsuleData.cover_art
										: "https://images.pexels.com/photos/1293120/pexels-photo-1293120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
								}
								alt=""
							/>
						</div>
						<div className="capsule-card__container">
							<time
								className="capsule-card__date text-label"
								dateTime="2025-06-06"
							>
								{formattedDate}
							</time>
							<small className="capsule-card__author text-label">
								{capsuleData.author}
							</small>
							<div className="capsule-card__title-container">
								<h2 className="capsule-card__title ">{capsuleData.title}</h2>
								<button
									className="capsule-card__button capsule-card__button--ellipsis"
									type="button"
									onClick={handleOptionsClick}
								>
									<svg
										className="capsule-card__icon"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="#1b2021"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<circle cx="12" cy="12" r="1" />
										<circle cx="12" cy="5" r="1" />
										<circle cx="12" cy="19" r="1" />
									</svg>
								</button>
								{isOptionsVisible && (
									<div className="capsule-card__options" ref={optionRef}>
										{new Date() < new Date(capsuleData.edit_by) && (
											<button
												className="capsule-card__button capsule-card__button--option text-label"
												type="button"
												onClick={handleEditClick}
											>
												Edit
											</button>
										)}
										<button
											className="capsule-card__button capsule-card__button--option text-label"
											type="button"
											onClick={handleShareClick}
										>
											Share
										</button>
									</div>
								)}
							</div>
						</div>
					</Link>
				</li>
			)}
		</>
	);
}

export default CapsuleCard;
