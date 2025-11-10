import "./App.scss";
import AddEditCapsulePage from "./pages/AddEditCapsulePage/AddEditCapsulePage";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import LockedCapsulePage from "./pages/LockedCapsulePage/LockedCapsulePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import PasswordPage from "./pages/PasswordPage/PasswordPage";
import UnlockedCapsulePage from "./pages/UnlockedCapsulePage/UnlockedCapsulePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/capsule/add" element={<AddEditCapsulePage />} />
				<Route path="/capsule/:capsuleId/access" element={<PasswordPage />} />
				<Route
					path="/capsule/:capsuleId/edit"
					element={<AddEditCapsulePage />}
				/>
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
