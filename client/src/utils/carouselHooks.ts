import { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";

type UseArrowButtonState = {
	prevBtnDisabled: boolean;
	nextBtnDisabled: boolean;
	onPrevButtonClick: () => void;
	onNextButtonClick: () => void;
};

interface UseArrowButtonOptions {
	onSlideChange?: (newSlideIndex: number) => void;
}

export function useMemoryCarouselArrows(
	emblaApi: EmblaCarouselType | undefined,
	options?: UseArrowButtonOptions,
): UseArrowButtonState {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

	const onPrevButtonClick = useCallback(() => {
		if (emblaApi) {
			const currentIndex = emblaApi.selectedScrollSnap();
			const newIndex = Math.max(0, currentIndex - 1);

			if (options?.onSlideChange && newIndex !== currentIndex) {
				options.onSlideChange(newIndex);
			}

			emblaApi.scrollPrev();
		}
	}, [emblaApi, options]);

	const onNextButtonClick = useCallback(() => {
		if (emblaApi) {
			const currentIndex = emblaApi.selectedScrollSnap();
			const snapCount = emblaApi.scrollSnapList().length;
			const newIndex = Math.min(snapCount - 1, currentIndex + 1);

			if (options?.onSlideChange && newIndex !== currentIndex) {
				options.onSlideChange(newIndex);
			}

			emblaApi.scrollNext();
		}
	}, [emblaApi, options]);

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
