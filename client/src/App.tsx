import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AddCapsulePage from "./pages/AddCapsulePage/AddCapsulePage";
import LockedCapsulePage from "./pages/LockedCapsulePage/LockedCapsulePage";
import UnlockedCapsulePage from "./pages/UnlockedCapsulePage/UnlockedCapsulePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/add" element={<AddCapsulePage />} />
				<Route path="/locked/:capsuleId" element={<LockedCapsulePage />} />
				<Route path="/unlocked/:capsuleId" element={<UnlockedCapsulePage />} />
				<Route path="/unlocked/:capsuleId" element={<UnlockedCapsulePage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
