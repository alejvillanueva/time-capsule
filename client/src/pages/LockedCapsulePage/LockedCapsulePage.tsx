import "./LockedCapsulePage.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCapsule } from "../../services/index";
import { Capsule } from "../../interfaces/index";
import useAppContext from "../../context/useAppContext";

function LockedCapsulePage() {
	const navigate = useNavigate();
	const { capsuleId } = useParams();
	const { openDate, setOpenDate, timeRemaining, setTimeRemaining } =
		useAppContext();
	const [capsule, setCapsule] = useState<Capsule>({
		author: "",
		cover_art: "",
		created_on: new Date(),
		edit_by: new Date(),
		id: 0,
		open_date: new Date(),
		password: "",
		title: "",
		updated_on: new Date(),
	});

	useEffect(() => {
		const fetchCapsule = async () => {
			try {
				const [data] = await getCapsule(Number(capsuleId));
				setCapsule(data);
				setOpenDate(new Date(data.open_date));
			} catch (error) {
				console.error("Fetching single capsule error:", error);
			}
		};

		fetchCapsule();
	}, [capsuleId]);

	useEffect(() => {
		if (openDate) {
			// repeats function every second
			const countdownInterval = setInterval(() => {
				const currentTime = Date.now();
				const openTime = new Date(openDate).getTime();

				let remainingTime = openTime - currentTime;

				if (remainingTime <= 0) {
					remainingTime = 0;
					// stops repeating interval started by setInterval
					clearInterval(countdownInterval);

					alert("Countdown complete");
					navigate(`/capsule/${capsuleId}/unlocked`);
				}

				setTimeRemaining(remainingTime);
			}, 1000);

			return () => clearInterval(countdownInterval);
		}
	}, [openDate]);

	const getFormattedTime = (timestamp: number) => {
		let totalSeconds = Math.floor(timestamp / 1000);
		let totalMinutes = Math.floor(totalSeconds / 60);
		let totalHours = Math.floor(totalMinutes / 60);
		let totalDays = Math.floor(totalHours / 24);
		let years = Math.floor(totalDays / 365);

		return {
			years: years.toString().padStart(2, "0"),
			days: (totalDays % 365).toString().padStart(2, "0"),
			hours: (totalHours % 24).toString().padStart(2, "0"),
			minutes: (totalMinutes % 60).toString().padStart(2, "0"),
			seconds: (totalSeconds % 60).toString().padStart(2, "0"),
		};
	};

	const formatted = getFormattedTime(timeRemaining);

	if (!capsule.title && !openDate) {
		return <div>Loading locked capsule page...</div>;
	}
	return (
		<main className="locked">
			<h1 className="locked__title text-heading">{capsule.title} </h1>
			<span className="sr-only" id="countdown-label">
				Countdown Timer to Open Capsule
			</span>
			<div className="sr-only" role="timer" aria-live="polite">
				{`${formatted.years} years, ${formatted.days} days, ${formatted.hours} hours, ${formatted.minutes} minutes, ${formatted.seconds} seconds`}
			</div>
			<div
				className="locked__countdown-container text-heading-orange-bold"
				aria-hidden="true"
			>
				{`${formatted.years}Y:${formatted.days}D:${formatted.hours}H:${formatted.minutes}M:${formatted.seconds}S`}
			</div>
		</main>
	);
}

export default LockedCapsulePage;
