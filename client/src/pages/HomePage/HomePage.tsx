import "./HomePage.scss";
import CapsuleCard from "../../components/CapsuleCard/CapsuleCard";
import Button from "../../components/Button/Button";
import { useEffect } from "react";

function HomePage() {
	//This is just for testing but this is being called twice.
	useEffect(() => {
		console.log("This is being called twice.");
	}, []);
	return (
		<main className="home">
			<ul className="home__list">
				<CapsuleCard cardType="add" />
				<CapsuleCard cardType="capsule" />
				<CapsuleCard cardType="capsule" />
				<CapsuleCard cardType="capsule" />
				<CapsuleCard cardType="capsule" />
				<CapsuleCard cardType="capsule" />
				<CapsuleCard cardType="capsule" />
				<CapsuleCard cardType="capsule" />
				<CapsuleCard cardType="capsule" />
				<CapsuleCard cardType="capsule" />
				<CapsuleCard cardType="capsule" />
				<CapsuleCard cardType="capsule" />
				<CapsuleCard cardType="capsule" />
			</ul>
			<div className="home__button-container">
				<Button buttonText="Sort" />
				<Button buttonText="Filter" />
			</div>
		</main>
	);
}

export default HomePage;
