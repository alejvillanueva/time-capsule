import { createContext, useState, ReactNode } from "react";

// define shape of context
interface AppContextType {
	coverArt: string | null;
	setCoverArt: (value: string | null) => void;
	isCapsuleEditable: boolean;
	setIsCapsuleEditable: (value: boolean) => void;
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	memoryModal: "default" | "custom" | "custom-editable" | null;
	setMemoryModal: (
		value: "default" | "custom" | "custom-editable" | null,
	) => void;
	isMemoryEditable: boolean;
	setIsMemoryEditable: (value: boolean) => void;
	openDate: Date | null;
	setOpenDate: (value: Date | null) => void;
	timeRemaining: number;
	setTimeRemaining: (value: number) => void;
}

// create intially empty context
// undefined helps prevent errors before context is set
export const AppContext = createContext<AppContextType | undefined>(undefined);

// create provider component
// ReactNode -> can be any valid React component (allows anything valid in JSX (e.g. components, text, fragments, arrays, etc.))
const AppProvider = ({ children }: { children: ReactNode }) => {
	const [coverArt, setCoverArt] = useState<string | null>(null);
	const [isCapsuleEditable, setIsCapsuleEditable] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [memoryModal, setMemoryModal] = useState<
		"default" | "custom" | "custom-editable" | null
	>(null);
	const [isMemoryEditable, setIsMemoryEditable] = useState<boolean>(false);
	const [openDate, setOpenDate] = useState<Date | null>(null);
	const [timeRemaining, setTimeRemaining] = useState<number>(0);

	return (
		<AppContext.Provider
			value={{
				coverArt,
				setCoverArt,
				isCapsuleEditable,
				setIsCapsuleEditable,
				isOpen,
				setIsOpen,
				memoryModal,
				setMemoryModal,
				isMemoryEditable,
				setIsMemoryEditable,
				openDate,
				setOpenDate,
				timeRemaining,
				setTimeRemaining,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
