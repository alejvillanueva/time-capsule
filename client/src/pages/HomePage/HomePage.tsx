import "./HomePage.scss";
import CapsuleCard from "../../components/CapsuleCard/CapsuleCard";
import Button from "../../components/Button/Button";

function HomePage() {
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
