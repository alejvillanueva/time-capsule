import "./CapsuleCard.scss";
import { Link, useNavigate } from "react-router-dom";
import { Capsule } from "../../interfaces/index";
import React, { useEffect, useRef, useState } from "react";

interface CapsuleCardProps {
	cardType: "add" | "capsule";
	data?: Capsule;
}

function CapsuleCard({ cardType, data }: CapsuleCardProps) {
	const navigate = useNavigate();
	const optionRef = useRef<HTMLDivElement | null>(null);
	const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);
	let formattedDate;
	if (data) {
		formattedDate = new Date(data.open_date).toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "2-digit",
		});
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
		navigate(`/capsule/${data?.id}/edit`);
	};

	const handleShareClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		// TODO: uncomment below and edit share link, add notification that it has been successfully copied
		// try {
		// 	navigator.clipboard.writeText(`/capsule/${data?.id}/unlocked`);
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
			{cardType === "capsule" && data && (
				<li className="capsule-card">
					<Link
						className="capsule-card__link"
						to={
							new Date() < new Date(data.open_date)
								? `/capsule/${data.id}/locked`
								: `/capsule/${data.id}/unlocked`
						}
					>
						<div className="capsule-card__container">
							<img
								className="capsule-card__image"
								src={
									data.cover_art
										? data.cover_art
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
								{data.author}
							</small>
							<div className="capsule-card__title-container">
								<h2 className="capsule-card__title ">{data.title}</h2>
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
								{/* TODO: add logic to show edit button if edit_by date has not passed */}
								{isOptionsVisible && (
									<div className="capsule-card__options" ref={optionRef}>
										<button
											className="capsule-card__button capsule-card__button--option text-label"
											type="button"
											onClick={handleEditClick}
										>
											Edit
										</button>
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
