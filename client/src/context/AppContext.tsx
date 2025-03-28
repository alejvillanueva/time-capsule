import { createContext, useState, ReactNode } from "react";

// define shape of context
interface AppContextType {
	state: any;
	setState: (value: any) => void;
}

// create intially empty context
// undefined helps prevent errors before context is set
export const AppContext = createContext<AppContextType | undefined>(undefined);

// TEMPORARY VALUES USED - please delete this comment once updated
// create provider component
// ReactNode -> can be any valid React component (allows anything valid in JSX (e.g. components, text, fragments, arrays, etc.))
const AppProvider = ({ children }: { children: ReactNode }) => {
	const [state, setState] = useState<string | null>(null);

	return (
		<AppContext.Provider value={{ state, setState }}>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;
