import { createContext, useState, ReactNode } from "react";
import { FileWithPath } from "react-dropzone";

// define shape of context
interface AppContextType {
	isFormEditable: boolean;
	setIsFormEditable: (value: boolean) => void;
	isMemoryFormEditable: boolean;
	setIsMemoryFormEditable: (value: boolean) => void;
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
	uploadedFile: FileWithPath | null;
	setUploadedFile: (value: FileWithPath | null) => void;
	memoryModalMode: "add" | "edit" | "read" | null;
	setMemoryModalMode: (value: "add" | "edit" | "read" | null) => void;
}

// create intially empty context
// undefined helps prevent errors before context is set
export const AppContext = createContext<AppContextType | undefined>(undefined);

// create provider component
// ReactNode -> can be any valid React component (allows anything valid in JSX (e.g. components, text, fragments, arrays, etc.))
const AppProvider = ({ children }: { children: ReactNode }) => {
	const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
	const [isMemoryFormEditable, setIsMemoryFormEditable] =
		useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const [isMemoryDeleteModalOpen, setIsMemoryDeleteModalOpen] =
		useState<boolean>(false);
	const [memoryModal, setMemoryModal] = useState<
		"default" | "custom" | "custom-editable" | null
	>(null);
	const [uploadedFile, setUploadedFile] = useState<FileWithPath | null>(null);
	const [memoryModalMode, setMemoryModalMode] = useState<
		"add" | "edit" | "read" | null
	>(null);

	return (
		<AppContext.Provider
			value={{
				isFormEditable,
				setIsFormEditable,
				isMemoryFormEditable,
				setIsMemoryFormEditable,
				isModalOpen,
				setIsModalOpen,
				isDeleteModalOpen,
				setIsDeleteModalOpen,
				isMemoryDeleteModalOpen,
				setIsMemoryDeleteModalOpen,
				memoryModal,
				setMemoryModal,
				uploadedFile,
				setUploadedFile,
				memoryModalMode,
				setMemoryModalMode,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
