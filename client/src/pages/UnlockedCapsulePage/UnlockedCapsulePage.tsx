import "./UnlockedCapsulePage.scss";
import MainHeading from "../../components/MainHeading/MainHeading";
import MemoryCarousel from "../../components/MemoryCarousel/MemoryCarousel";

function UnlockedCapsulePage() {
	return (
		<main className="unlocked">
			<MemoryCarousel slides={[0, 1, 2, 3, 4]} options={{ loop: true }} />
			{/* <div className="unlocked__container">
				Temp Image
				<p className="unlocked__text">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</div> */}
			<div className="unlocked__title-container">
				<MainHeading headingType="custom-carousel" title="Lorem Ipsum" />
			</div>
		</main>
	);
}

export default UnlockedCapsulePage;
