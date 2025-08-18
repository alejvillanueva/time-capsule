import "./PasswordPage.scss";
import MainHeading from "../../components/MainHeading/MainHeading";
import InputField from "../../components/InputField/InputField";
import React, { useEffect, useState } from "react";
import useAppContext from "../../context/useAppContext";
import { getCapsule } from "../../services/index";
import { useNavigate, useParams } from "react-router-dom";

function PasswordPrompt() {
	const navigate = useNavigate();
	const { capsuleId } = useParams();
	const [capsulePass, setCapsulePass] = useState<string | null>(null);
	const [isInvalid, setIsInvalid] = useState<boolean>(false);
	const [passInput, setPassInput] = useState<string | null>(null);
	const { setIsFormEditable } = useAppContext();

	const fetchCapsule = async (id: number) => {
		try {
			const [data] = await getCapsule(id);

			setCapsulePass(data.password);
		} catch (error) {
			console.error("Fetching capsule error:", error);
		}
	};

	useEffect(() => {
		if (capsuleId) fetchCapsule(Number(capsuleId));
		// Always allow editing on this modal
		setIsFormEditable(true);
	}, []);

	const handlePassChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		setPassInput(e.target.value);
	};

	let attemptCount = 0;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!passInput) {
			setIsInvalid(true);
			return;
		}

		if (attemptCount >= 4) navigate("/");
		if (capsulePass === passInput) {
			navigate(`/capsule/${Number(capsuleId)}/edit`);
		} else {
			attemptCount++;
			setIsInvalid(true);
		}
	};

	return (
		<main className="pass">
			<form className="pass__form" onSubmit={handleSubmit}>
				<InputField
					inputLabel="Password"
					inputType="password"
					inputName="pass_prompt"
					inputId="pass_prompt"
					handleChange={handlePassChange}
					validation={{ required: true, isInvalid: isInvalid }}
					placeholder="Type the password to edit capsule"
					value={passInput}
				/>
				<MainHeading
					headingType="default"
					title="Enter Password"
					h2={true}
					showIcons={true}
					resourceType="capsule"
				/>
			</form>
		</main>
	);
}

export default PasswordPrompt;
