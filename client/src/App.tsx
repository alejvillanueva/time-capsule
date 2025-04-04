import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import LockedCapsulePage from "./pages/LockedCapsulePage/LockedCapsulePage";
import UnlockedCapsulePage from "./pages/UnlockedCapsulePage/UnlockedCapsulePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AddCapsulePage from "./pages/AddCapsulePage/AddCapsulePage";
import EditCapsulePage from "./pages/EditCapsulePage/EditCapsulePage";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/capsule/add" element={<AddCapsulePage />} />
				<Route path="/capsule/:capsuleId" element={<EditCapsulePage />} />
				<Route path="/capsule/:capsuleId/edit" element={<EditCapsulePage />} />
				<Route
					path="/capsule/:capsuleId/locked"
					element={<LockedCapsulePage />}
				/>
				<Route
					path="/capsule/:capsuleId/unlocked"
					element={<UnlockedCapsulePage />}
				/>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
