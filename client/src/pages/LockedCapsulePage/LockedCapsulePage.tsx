import "./LockedCapsulePage.scss";
import { useEffect } from "react";
import useAppContext from "../../context/useAppContext";

function LockedCapsulePage() {
	// const {openDate, setOpenDate, timeRemaining, setTimeRemaining} = useAppContext();

	useEffect(() => {}, []);

	return (
		<main className="locked">
			<h1 className="locked__title text-heading">Lorem Ipsum</h1>
			<div className="locked__countdown-container text-heading-orange-bold">
				01Y:10M:27D:05H:26M:07s
			</div>
		</main>
	);
}

export default LockedCapsulePage;
