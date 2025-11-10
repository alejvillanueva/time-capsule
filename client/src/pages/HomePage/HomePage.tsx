import "./HomePage.scss";
import Button from "../../components/Button/Button";
import CapsuleCard from "../../components/CapsuleCard/CapsuleCard";
import { Capsule } from "../../interfaces/index";
import { getAllCapsules } from "../../services/index";
import { useEffect, useState } from "react";

function HomePage() {
	const [capsules, setCapsules] = useState<Capsule[]>([]);

	useEffect(() => {
		const fetchCapsules = async () => {
			try {
				const data = await getAllCapsules();
				setCapsules(data);
			} catch (error) {
				console.error("Fetching home page capsules error:", error);
			}
		};

		fetchCapsules();
	}, []);

	if (capsules.length === 0) {
		return <div>Loading home page...</div>;
	}

	return (
		<main className="home">
			<ul className="home__list">
				<CapsuleCard cardType="add" />
				{capsules
					?.sort(
						(a, b) =>
							new Date(a.open_date).getTime() - new Date(b.open_date).getTime(),
					)
					.map((capsule, i) => (
						<CapsuleCard key={i} cardType="capsule" capsuleData={capsule} />
					))}
			</ul>
			<div className="home__button-container">
				<Button buttonText="Sort" />
				<Button buttonText="Filter" />
			</div>
		</main>
	);
}

export default HomePage;
