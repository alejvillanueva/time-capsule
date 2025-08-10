import "./NotFoundPage.scss";
import animationData from "../../assets/animations/perspectiveAnimation.json";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import MainHeading from "../../components/MainHeading/MainHeading";

function NotFoundPage() {
	return (
		<main className="not-found">
			<div className="not-found__status text-heading">
				4
				<Lottie
					className="not-found__animation"
					animationData={animationData}
					loop={true}
					autoplay={true}
				/>
				4
			</div>
			<MainHeading
				headingType="default"
				title="Page Not Found"
				showIcons={false}
				resourceType="not found"
			/>
			<p className="not-found__text text-body">
				Nothing here but space dust and forgotten memories... We can't find the
				page you want —{" "}
				<Link className="not-found__link" to="/">
					try here!
				</Link>
			</p>
		</main>
	);
}

export default NotFoundPage;
