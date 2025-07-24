import { createContext, useState, ReactNode } from "react";

// define shape of context
interface AppContextType {
	coverArt: string | null;
	setCoverArt: (value: string | null) => void;
	isFormEditable: boolean;
	setIsFormEditable: (value: boolean) => void;
	isModalOpen: boolean;
	setIsModalOpen: (value: boolean) => void;
	isDeleteModalOpen: boolean;
	setIsDeleteModalOpen: (value: boolean) => void;
	isMemoryDeleteModalOpen: boolean;
	setIsMemoryDeleteModalOpen: (value: boolean) => void;
	memoryModal: "default" | "custom" | "custom-editable" | null;
	setMemoryModal: (
		value: "default" | "custom" | "custom-editable" | null,
	) => void;
	openDate: Date | null;
	setOpenDate: (value: Date | null) => void;
	timeRemaining: number;
	setTimeRemaining: (value: number) => void;
	uploadedFile: File | null;
	setUploadedFile: (value: File | null) => void;
	currentMemorySlide: number;
	setCurrentMemorySlide: (value: number) => void;
	memoryModalMode: "add" | "edit" | "read" | null;
	setMemoryModalMode: (value: "add" | "edit" | "read" | null) => void;
}

// create intially empty context
// undefined helps prevent errors before context is set
export const AppContext = createContext<AppContextType | undefined>(undefined);

// create provider component
// ReactNode -> can be any valid React component (allows anything valid in JSX (e.g. components, text, fragments, arrays, etc.))
const AppProvider = ({ children }: { children: ReactNode }) => {
	const [coverArt, setCoverArt] = useState<string | null>(null);
	const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const [isMemoryDeleteModalOpen, setIsMemoryDeleteModalOpen] =
		useState<boolean>(false);
	const [memoryModal, setMemoryModal] = useState<
		"default" | "custom" | "custom-editable" | null
	>(null);
	const [openDate, setOpenDate] = useState<Date | null>(null);
	const [timeRemaining, setTimeRemaining] = useState<number>(0);
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const [currentMemorySlide, setCurrentMemorySlide] = useState<number>(0);
	const [memoryModalMode, setMemoryModalMode] = useState<
		"add" | "edit" | "read" | null
	>(null);

	return (
		<AppContext.Provider
			value={{
				coverArt,
				setCoverArt,
				isFormEditable,
				setIsFormEditable,
				isModalOpen,
				setIsModalOpen,
				isDeleteModalOpen,
				setIsDeleteModalOpen,
				isMemoryDeleteModalOpen,
				setIsMemoryDeleteModalOpen,
				memoryModal,
				setMemoryModal,
				openDate,
				setOpenDate,
				timeRemaining,
				setTimeRemaining,
				uploadedFile,
				setUploadedFile,
				currentMemorySlide,
				setCurrentMemorySlide,
				memoryModalMode,
				setMemoryModalMode,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
