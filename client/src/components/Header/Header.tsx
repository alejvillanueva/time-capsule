import "./Header.scss";
import { Link, matchPath, useLocation } from "react-router-dom";

function Header() {
	const { pathname } = useLocation();

	const addMatch = matchPath("/capsule/add", pathname);
	const capsuleMatch = matchPath("/capsule/:capsuleId", pathname);
	const editMatch = matchPath("/capsule/:capsuleId/edit", pathname);

	return (
		<header className="header">
			{(addMatch || capsuleMatch || editMatch) && (
				<Link className={`header__link header__link--back text-link`} to="/">
					<svg
						className="header__icon"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#757575"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="m12 19-7-7 7-7" />
						<path d="M19 12H5" />
					</svg>
					Back
				</Link>
			)}
			<Link className="header__link" to="/">
				<h1 className="header__text text-logo">Memora</h1>
			</Link>
		</header>
	);
}

export default Header;
