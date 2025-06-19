import "./UnlockedCapsulePage.scss";
import MainHeading from "../../components/MainHeading/MainHeading";
import MemoryCarousel from "../../components/MemoryCarousel/MemoryCarousel";
import ShareModal from "../../components/ShareModal/ShareModal";
import useAppContext from "../../context/useAppContext";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCapsule } from "../../services/index";
import { Memory } from "../../interfaces/index";

function UnlockedCapsulePage() {
	const { capsuleId } = useParams();
	const { setIsModalOpen } = useAppContext();
	const [memories, setMemories] = useState<Memory[]>([]);
	const [capsuleTitle, setCapsuleTitle] = useState("");
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const fetchMemories = async () => {
			try {
				const [data] = await getCapsule(Number(capsuleId));
				setCapsuleTitle(data.title);
				setMemories(data.memories);
			} catch (error) {
				console.error("Error fetching memories:", error);
			}
		};

		fetchMemories();
	}, [capsuleId]);

	const handleModalClick = () => {
		setIsModalOpen(true);
	};

	if (memories.length === 0) {
		return <div>Loading unlocked capsule page...</div>;
	}
	return (
		<main className="unlocked">
			<MemoryCarousel
				memories={memories}
				options={{ loop: true }}
				currentSlide={currentSlide}
				setCurrentSlide={setCurrentSlide}
			/>
			<div className="unlocked__author-container">
				<MainHeading
					headingType="custom-carousel"
					title={capsuleTitle}
					resourceType="capsule"
					handleModalClick={handleModalClick}
					memoryCount={memories.length}
					currentSlide={currentSlide}
				/>
			</div>
			<ShareModal />
		</main>
	);
}

export default UnlockedCapsulePage;
