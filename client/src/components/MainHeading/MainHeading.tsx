import "./MainHeading.scss";
import Tooltip from "../Tooltip/Tooltip";
import useAppContext from "../../context/useAppContext";
import {
	matchPath,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import { deleteCapsule, deleteMemory } from "../../services/index";
import { deleteFile } from "../../utils/media";
import { Memory } from "../../interfaces/index";
import { SelectedSnapDisplay } from "../MemoryCarouselFunctions/MemoryCarouselFunctions";

interface MainHeadingProps {
	headingType: "default" | "custom" | "custom-editable" | "custom-carousel";
	title: string | string[];
	h2?: boolean;
	resourceType: "capsule" | "memory" | "not found";
	showIcons?: boolean;
	handleModalClick?: () => void;
	memoryCount?: number;
	currentSlide?: number;
	buttonTitle?: string;
	memoryId?: number;
	coverUrl?: string;
	memories?: Memory[];
}

function MainHeading({
	headingType,
	title,
	h2,
	resourceType,
	showIcons,
	handleModalClick,
	memoryCount,
	currentSlide = 0,
	buttonTitle,
	memoryId,
	coverUrl,
	memories,
}: MainHeadingProps) {
	const {
		setIsFormEditable,
		setIsMemoryFormEditable,
		setMemoryModalMode,
		isModalOpen,
		setIsModalOpen,
		setIsDeleteModalOpen,
		memoryModalMode,
		isMemoryDeleteModalOpen,
		setIsMemoryDeleteModalOpen,
	} = useAppContext();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { capsuleId } = useParams();

	const addMatch = matchPath("/capsule/add", pathname);
	const editMatch = matchPath("/capsule/:capsuleId/edit", pathname);

	const handleConfirmDeleteClick = async () => {
		try {
			if (isModalOpen && isMemoryDeleteModalOpen) {
				const deleteStatus = await deleteMemory(Number(memoryId));

				if (deleteStatus === 204) {
					setIsMemoryDeleteModalOpen(false);
					setIsModalOpen(false);
				}
			} else if (!isModalOpen) {
				// Delete uploaded media for capsule memories first
				if (memories && memories.length > 0) {
					const capsuleMedia = memories.filter((memory) => memory.url !== "");

					if (capsuleMedia.length > 0) {
						try {
							// TODO: uncomment once PRs are merged
							// setIsLoading(true);

							const deletePromises = capsuleMedia.map((memory) => {
								if (memory.url) {
									return deleteFile(memory.url, memory.medium);
								}
							});

							const deleteMediaResults = await Promise.all(deletePromises);

							capsuleMedia.forEach((memory, id) => {
								if (deleteMediaResults[id] === "Success") {
									memory.url = "";
								}
							});
						} catch (error) {
							console.error("Error deleting capsule media:", error);
						} finally {
							// TODO: uncomment once PRs are merged
							// setIsLoading(false);
						}
					}
				}

				// Delete uploaded media for capsule cover art second
				if (coverUrl) {
					const deleteCover = await deleteFile(coverUrl, "image");

					if (deleteCover === "Success") coverUrl = "";
				}

				// Delete capsule from database last
				const deleteStatus = await deleteCapsule(Number(capsuleId));

				if (deleteStatus === 204) {
					setIsDeleteModalOpen(false);
					navigate("/");
				}
			}
		} catch (error) {
			console.error("Deleting capsule error:", error);
		}
	};

	return (
		<>
			{headingType === "default" && (
				<div className="main-heading">
					{h2 ? (
						<h2 className="main-heading__title text-heading" id="modal-heading">
							{title}
						</h2>
					) : (
						<h1 className="main-heading__title text-heading" id="modal-heading">
							{title}
						</h1>
					)}
					{showIcons && (
						<div className="main-heading__button-container">
							<button
								className="main-heading__button"
								type="button"
								aria-label={`Cancel ${resourceType} form creation`}
								onClick={() => {
									addMatch
										? navigate("/")
										: isModalOpen
											? setIsModalOpen(false)
											: navigate(-1);
								}}
							>
								<Tooltip title={"Cancel"} position="bottom" />
								<svg
									className="main-heading__icon"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="#757575"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M18 6 6 18" />
									<path d="m6 6 12 12" />
								</svg>
							</button>
							{buttonTitle ? (
								<button
									className="main-heading__button"
									aria-label={`${buttonTitle} ${resourceType}`}
									type="button"
									onClick={handleConfirmDeleteClick}
								>
									<Tooltip title={buttonTitle} position="bottom" />
									<svg
										className="main-heading__icon"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="#757575"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M20 6 9 17l-5-5" />
									</svg>
								</button>
							) : (
								<button
									className="main-heading__button"
									aria-label={`Submit ${resourceType} form`}
								>
									<Tooltip title="Submit" position="bottom" />
									<svg
										className="main-heading__icon"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="#757575"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M20 6 9 17l-5-5" />
									</svg>
								</button>
							)}
						</div>
					)}
				</div>
			)}
			{headingType === "custom" && (
				<div className="main-heading">
					{h2 ? (
						<h2
							className="main-heading__title text-heading-bold"
							id="modal-heading"
						>
							{title}
						</h2>
					) : (
						<h1
							className="main-heading__title text-heading-bold"
							id="modal-heading"
						>
							{title}
						</h1>
					)}
					<div className="main-heading__button-container">
						<button
							className="main-heading__button"
							type="button"
							aria-label={`Edit ${resourceType} form`}
							onClick={() => {
								if (editMatch && !isModalOpen) setIsFormEditable(true);

								if (isModalOpen && memoryModalMode === "read")
									setIsMemoryFormEditable(true);

								setMemoryModalMode("edit");
							}}
						>
							<Tooltip title={"Edit"} position="bottom" />
							<svg
								className="main-heading__icon"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#757575"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
								<path d="m15 5 4 4" />
							</svg>
						</button>
						<button
							className="main-heading__button"
							type="button"
							aria-label={`Delete ${resourceType}`}
							onClick={handleModalClick}
						>
							<Tooltip title={"Delete"} position="bottom" />
							<svg
								className="main-heading__icon"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#757575"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M3 6h18" />
								<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
								<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
								<line x1="10" x2="10" y1="11" y2="17" />
								<line x1="14" x2="14" y1="11" y2="17" />
							</svg>
						</button>
					</div>
				</div>
			)}
			{headingType === "custom-editable" && (
				<div className="main-heading">
					{h2 ? (
						<h2
							className="main-heading__title text-heading-bold"
							id="modal-heading"
						>
							{title}
						</h2>
					) : (
						<h1
							className="main-heading__title text-heading-bold"
							id="modal-heading"
						>
							{title}
						</h1>
					)}
					<div className="main-heading__button-container">
						<button
							className="main-heading__button"
							type="button"
							aria-label={`Cancel ${resourceType} form modifications`}
							onClick={() => {
								if (!isModalOpen) {
									setIsFormEditable(false);
								} else {
									setIsMemoryFormEditable(false);
								}
								setMemoryModalMode("read");
							}}
						>
							<Tooltip title={"Cancel"} position="bottom" />
							<svg
								className="main-heading__icon"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#757575"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M18 6 6 18" />
								<path d="m6 6 12 12" />
							</svg>
						</button>

						<button
							className="main-heading__button"
							aria-label={`Submit ${resourceType} form`}
						>
							<Tooltip title={"Submit"} position="bottom" />
							<svg
								className="main-heading__icon"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#757575"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M20 6 9 17l-5-5" />
							</svg>
						</button>
					</div>
				</div>
			)}
			{headingType === "custom-carousel" && memoryCount && (
				<div className="main-heading">
					{h2 ? (
						<h2
							className="main-heading__title text-heading-bold"
							id="modal-heading"
						>
							{title}
						</h2>
					) : (
						<h1
							className="main-heading__title text-heading-bold"
							id="modal-heading"
						>
							{title}
						</h1>
					)}
					<div className="main-heading__button-container">
						<SelectedSnapDisplay
							selectedSnap={currentSlide}
							snapCount={memoryCount}
						/>
						<button
							className="main-heading__button"
							type="button"
							aria-label={`Share ${resourceType}`}
							onClick={handleModalClick}
						>
							<Tooltip title={"Share"} position="bottom" />
							<svg
								className="main-heading__icon"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#757575"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="18" cy="5" r="3" />
								<circle cx="6" cy="12" r="3" />
								<circle cx="18" cy="19" r="3" />
								<line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
								<line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
							</svg>
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default MainHeading;
