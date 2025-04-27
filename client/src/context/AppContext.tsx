import { createContext, useState, ReactNode } from "react";

// define shape of context
interface AppContextType {
	coverArt: string | null;
	setCoverArt: (value: string | null) => void;
	isEditable: boolean;
	setIsEditable: (value: boolean) => void;
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
}

// create intially empty context
// undefined helps prevent errors before context is set
export const AppContext = createContext<AppContextType | undefined>(undefined);

// create provider component
// ReactNode -> can be any valid React component (allows anything valid in JSX (e.g. components, text, fragments, arrays, etc.))
const AppProvider = ({ children }: { children: ReactNode }) => {
	const [coverArt, setCoverArt] = useState<string | null>(null);
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<AppContext.Provider
			value={{
				coverArt,
				setCoverArt,
				isEditable,
				setIsEditable,
				isOpen,
				setIsOpen,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
