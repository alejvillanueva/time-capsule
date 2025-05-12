import { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";

type UseArrowButtonState = {
	prevBtnDisabled: boolean;
	nextBtnDisabled: boolean;
	onPrevButtonClick: () => void;
	onNextButtonClick: () => void;
};

export function useMemoryCarouselArrows(
	emblaApi: EmblaCarouselType | undefined,
): UseArrowButtonState {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

	const onPrevButtonClick = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const onNextButtonClick = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setPrevBtnDisabled(!emblaApi.canScrollPrev());
		setNextBtnDisabled(!emblaApi.canScrollNext());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		emblaApi.on("reInit", onSelect).on("select", onSelect);
	}, [emblaApi, onSelect]);

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	};
}

type UseSelectedSnapDisplayType = {
	selectedSnap: number;
	snapCount: number;
};

export function useSelectedSnapDisplay(
	emblaApi: EmblaCarouselType | undefined,
): UseSelectedSnapDisplayType {
	const [selectedSnap, setSelectedSnap] = useState(0);
	const [snapCount, setSnapCount] = useState(0);

	const updateScrollSnapState = useCallback((emblaApi: EmblaCarouselType) => {
		setSnapCount(emblaApi.scrollSnapList().length);
		setSelectedSnap(emblaApi.selectedScrollSnap());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		updateScrollSnapState(emblaApi);
		emblaApi.on("select", updateScrollSnapState);
		emblaApi.on("reInit", updateScrollSnapState);
	}, [emblaApi, updateScrollSnapState]);

	return {
		selectedSnap,
		snapCount,
	};
}
