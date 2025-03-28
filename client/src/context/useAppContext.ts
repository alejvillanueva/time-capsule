import { useContext } from "react";
import { AppContext } from "./AppContext";

// custom hook for easier use
const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) throw new Error("useAppContext must be used with AppProvider");
	return context;
};

export default useAppContext;
