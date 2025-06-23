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
	capsuleFormData: TimeCapsule;
	setCapsuleFormData: (value: TimeCapsule) => void;
	uploadedFile: File[] | null;
	setUploadedFile: (value: File[] | null) => void;
	memoryFormData: CapsuleMemory;
	setMemoryFormData: (value: CapsuleMemory) => void;
}

interface TimeCapsule {
	author: string;
	cover_art?: string;
	created_on: Date;
	edit_by: Date;
	open_date: Date;
	password?: string;
	title: string;
	updated_on: Date;
}

interface CapsuleMemory {
	author: string;
	capsule_id: number;
	added_on: Date | null;
	medium: "image" | "text" | "video" | null;
	message?: string | null;
	url?: string | null;
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
	const [capsuleFormData, setCapsuleFormData] = useState<TimeCapsule>({
		author: "",
		cover_art: "",
		created_on: new Date(),
		edit_by: new Date(),
		open_date: new Date(),
		password: "",
		title: "",
		updated_on: new Date(),
	});
	const [uploadedFile, setUploadedFile] = useState<File[] | null>(null);
	const [memoryFormData, setMemoryFormData] = useState<CapsuleMemory>({
		author: "",
		capsule_id: 0,
		added_on: null,
		medium: null,
		message: "",
		url: "",
	});

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
				capsuleFormData,
				setCapsuleFormData,
				uploadedFile,
				setUploadedFile,
				memoryFormData,
				setMemoryFormData,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
