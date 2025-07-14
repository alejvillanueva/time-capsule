import "./MainHeading.scss";
import { SelectedSnapDisplay } from "../MemoryCarouselFunctions/MemoryCarouselFunctions";
import useAppContext from "../../context/useAppContext";
import {
	matchPath,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import { deleteCapsule, deleteMemory } from "../../services/index";

interface MainHeadingProps {
	headingType: "default" | "custom" | "custom-editable" | "custom-carousel";
	title: string | string[];
	h2?: boolean;
	resourceType: "capsule" | "memory";
	showIcons?: boolean;
	handleModalClick?: () => void;
	memoryCount?: number;
	currentSlide?: number;
	buttonTitle?: string;
	memoryId?: number;
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
}: MainHeadingProps) {
	const {
		setIsFormEditable,
		setMemoryModalMode,
		isModalOpen,
		setIsModalOpen,
		isDeleteModalOpen,
		setIsDeleteModalOpen,
	} = useAppContext();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { capsuleId } = useParams();

	const addMatch = matchPath("/capsule/add", pathname);

	const handleConfirmDeleteClick = async () => {
		try {
			if (isModalOpen && isDeleteModalOpen) {
				const deleteStatus = await deleteMemory(Number(memoryId));

				if (deleteStatus === 204) {
					setIsDeleteModalOpen(false);
					setIsModalOpen(false);
				}
			} else if (!isModalOpen) {
				const deleteStatus = await deleteCapsule(Number(capsuleId));

				if (deleteStatus === 204) navigate("/");
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
								title="Cancel"
								onClick={() => {
									addMatch
										? navigate("/")
										: isModalOpen
											? setIsModalOpen(false)
											: navigate(-1);
								}}
							>
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
									title={buttonTitle}
									type="button"
									onClick={handleConfirmDeleteClick}
								>
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
									title="Submit"
								>
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
							title="Edit"
							onClick={() => {
								setIsFormEditable(true);
								setMemoryModalMode("edit");
							}}
						>
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
							title="Delete"
							onClick={handleModalClick}
						>
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
							title="Cancel"
							onClick={() => {
								setIsFormEditable(false);
								setMemoryModalMode("read");
							}}
						>
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
							title="Submit"
						>
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
							title="Share"
							onClick={handleModalClick}
						>
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
