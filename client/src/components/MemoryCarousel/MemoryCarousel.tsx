import "./MemoryCarousel.scss";
import { EmblaOptionsType } from "embla-carousel";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { useMemoryCarouselArrows } from "../../utils/carouselHooks";
import {
	PrevButton,
	NextButton,
} from "../MemoryCarouselFunctions/MemoryCarouselFunctions";

interface CarouselProps {
	slides: number[];
	options?: EmblaOptionsType;
}

function MemoryCarousel({ slides, options }: CarouselProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = useMemoryCarouselArrows(emblaApi);

	return (
		<section className="memory-carousel">
			<div className="memory-carousel__buttons">
				<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
			</div>
			<div className="memory-carousel__viewport" ref={emblaRef}>
				<div className="memory-carousel__slide-container">
					{slides.map((index) => (
						<div className="memory-carousel__slide" key={index}>
							<img
								className="memory-carousel__img"
								src="https://picsum.photos/1920/1080"
								alt="TEMPORARY"
							/>
						</div>
					))}
				</div>
			</div>
			<div className="memory-carousel__buttons">
				<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
			</div>
		</section>
	);
}

export default MemoryCarousel;
