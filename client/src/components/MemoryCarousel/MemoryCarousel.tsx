import "./MemoryCarousel.scss";
import { EmblaOptionsType } from "embla-carousel";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { useMemoryCarouselArrows } from "../../utils/carouselHooks";
import {
	PrevButton,
	NextButton,
} from "../MemoryCarouselFunctions/MemoryCarouselFunctions";
import { Memory } from "../../interfaces/index";
import { useState, useEffect, useRef, useCallback } from "react";
import { EmblaCarouselType } from "embla-carousel";

interface CarouselProps {
	memories: Memory[];
	options?: EmblaOptionsType;
	currentSlide: number;
	setCurrentSlide: (value: number) => void;
}

function MemoryCarousel({
	memories,
	options,
	currentSlide,
	setCurrentSlide,
}: CarouselProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);
	const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const [overlayWidth, setOverlayWidth] = useState<number>(0);
	const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
	const overlayRef = useRef<HTMLDivElement | null>(null);

	const handleSlideChange = useCallback(
		(newSlide: number) => {
			setCurrentSlide(newSlide);
		},
		[setCurrentSlide],
	);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = useMemoryCarouselArrows(emblaApi, { onSlideChange: handleSlideChange });

	const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			setIsOverlayOpen(!isOverlayOpen);
		} else if (e.key === "Escape") {
			setIsOverlayOpen(false);
		}
	};

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (
				e.target instanceof Node &&
				!slideRefs.current.some((slideEl) =>
					slideEl?.contains(e.target as Node),
				)
			) {
				setIsOverlayOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOverlayOpen]);

	// Returns an array of the current slide index
	const emblaCurrentSlide = useCallback(
		(emblaApi: EmblaCarouselType) => {
			const currentIndex = emblaApi.selectedScrollSnap();
			// Only update if different from current state
			if (currentIndex !== currentSlide) {
				setCurrentSlide(currentIndex);
			}
		},
		[currentSlide, setCurrentSlide],
	);

	useEffect(() => {
		if (emblaApi) {
			emblaApi.on("select", emblaCurrentSlide);

			// Set initial slide immediately when emblaApi is ready
			const initialSlide = emblaApi.selectedScrollSnap();
			if (initialSlide !== currentSlide) {
				setCurrentSlide(initialSlide);
			}
		}

		return () => {
			if (emblaApi) {
				emblaApi.off("select", emblaCurrentSlide);
			}
		};
	}, [emblaApi, emblaCurrentSlide, currentSlide, setCurrentSlide]);

	// Sync embla carousel with external currentSlide prop changes
	useEffect(() => {
		if (emblaApi && emblaApi.selectedScrollSnap() !== currentSlide) {
			emblaApi.scrollTo(currentSlide);
		}
	}, [emblaApi, currentSlide]);

	const getImageWidth = (slideIndex: number): number => {
		const slideRef = slideRefs.current[slideIndex];
		const mediaEl = slideRef?.querySelector("img");
		return mediaEl?.offsetWidth || 0;
	};

	const updateOverlayWidth = useCallback(() => {
		const currentRef = slideRefs.current[currentSlide];
		const mediaEl = currentRef?.querySelector("img");
		const width = mediaEl?.offsetWidth || 0;

		setOverlayWidth(width);
	}, [currentSlide]);

	// Removes download option from video controls
	// Limited browser availibity - Safari + Edge
	useEffect(() => {
		const videoEls = document.querySelectorAll("video");

		videoEls.forEach((videoEl) => {
			(
				videoEl as HTMLVideoElement & { controlsList?: DOMTokenList }
			).controlsList?.add("nodownload");
		});
	}, [memories]);

	return (
		<section className="memory-carousel">
			<div className="memory-carousel__buttons">
				<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
			</div>
			<div className="memory-carousel__viewport" ref={emblaRef}>
				<div className="memory-carousel__slide-container">
					{memories?.map((memory, index) => {
						const isCurrentSlide = currentSlide === index;
						return (
							<div
								className="memory-carousel__slide"
								onMouseEnter={() => {
									setIsHovered(true); // Preemptively calculate width on hover
									if (isCurrentSlide) {
										const width = getImageWidth(index);
										if (width > 0) setOverlayWidth(width);
									}
								}}
								onMouseLeave={() => setIsHovered(false)}
								onClick={() => {
									// Calculate width immediately before opening overlay
									if (isCurrentSlide) {
										const width = getImageWidth(index);
										if (width > 0) setOverlayWidth(width);
									}
									setIsOverlayOpen(!isOverlayOpen);
								}}
								onKeyDown={handleOverlayKeyDown}
								tabIndex={isCurrentSlide && !isOverlayOpen ? 0 : -1}
								{...(!isCurrentSlide && ({ inert: "" } as any))}
								key={index}
								ref={(element) => {
									if (slideRefs.current) {
										slideRefs.current[index] = element;
									}
								}}
							>
								{(isOverlayOpen || isHovered) &&
									(memory.author || memory.message) &&
									memory.medium === "image" && (
										<div
											className="memory-carousel__overlay"
											ref={overlayRef}
											style={
												overlayWidth > 0 ? { width: `${overlayWidth}px` } : {}
											}
										>
											<p className="memory-carousel__caption">
												{memory.message}
											</p>
											<small className="memory-carousel__author memory-carousel__author--white">
												— {memory.author}
											</small>
										</div>
									)}
								{memory.medium === "image" && memory.url ? (
									<div className="memory-carousel__media-container memory-carousel__media-container--image">
										<img
											className="memory-carousel__image"
											src={memory.url}
											alt={`Image authored by ${memory.author}`}
											onLoad={updateOverlayWidth}
										/>
									</div>
								) : memory.medium === "video" && memory.url ? (
									<div className="memory-carousel__media-container">
										<video
											className="memory-carousel__video"
											src={memory.url}
											controls
										></video>
									</div>
								) : (
									<div className="memory-carousel__media-container memory-carousel__media-container--text">
										<p className="memory-carousel__message">{memory.message}</p>
										<small className="memory-carousel__author">
											— {memory.author}
										</small>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
			<div className="memory-carousel__buttons">
				<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
			</div>
		</section>
	);
}

export default MemoryCarousel;
