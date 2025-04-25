import "./AddCapsulePage.scss";
import MainHeading from "../../components/MainHeading/MainHeading";
// import useAppContext from "../../context/useAppContext";
import { useDropzone } from "react-dropzone";

function AddCapsulePage() {
	// const { coverArt, setCoverArt } = useAppContext();
	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			"image/png": [".png"],
			"image/jpeg": [".jpg", ".jpeg"],
			"image/webp": [".webp"],
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	// setCoverArt();

	return (
		<main className="add-capsule">
			<form className="add-capsule__form" onSubmit={handleSubmit}>
				<div className="add-capsule__form-container">
					<label
						className="add-capsule__label text-label"
						htmlFor="capsule_image"
					>
						Cover Art
					</label>
					<div className="add-capsule__drop-zone" {...getRootProps()}>
						<svg
							className="add-capsule__icon"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#757575"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
							<polyline points="17 8 12 3 7 8" />
							<line x1="12" x2="12" y1="3" y2="15" />
						</svg>
						<p className="add-capsule__drop-text text-body">
							Drag and drop file here,
						</p>
						<p className="add-capsule__drop-text text-body">
							or click to select file
						</p>
						<p className="add-capsule__drop-text add-capsule__drop-text--light text-body">
							(jpg, jpeg, png, webp)
						</p>

						<input
							type="file"
							name="capsule_image"
							id="capsule_image"
							{...getInputProps()}
						/>
					</div>
				</div>
				<div className="add-capsule__form-container">
					<label
						className="add-capsule__label text-label"
						htmlFor="capsule_title"
					>
						Title
					</label>
					<input
						className="add-capsule__input"
						type="text"
						name="capsule_title"
						id="capsule_title"
						placeholder="Type the capsule title"
					/>
					<label
						className="add-capsule__label text-label"
						htmlFor="capsule_author"
					>
						Author
					</label>
					<input
						className="add-capsule__input"
						type="text"
						name="capsule_author"
						id="capsule_author"
						placeholder="Type your name"
					/>
					<label
						className="add-capsule__label text-label"
						htmlFor="capsule_unlock_date"
					>
						Open Date: Open Capsule
					</label>
					<input
						className="add-capsule__input"
						type="date"
						name="capsule_unlock_date"
						id="capsule_unlock_date"
					/>
					<label
						className="add-capsule__label text-label"
						htmlFor="capsule_edit_date"
					>
						Edit Date: Allow Capsule Editing Until
					</label>
					<input
						className="add-capsule__input"
						type="date"
						name="capsule_edit_date"
						id="capsule_edit_date"
					/>
					<label
						className="add-capsule__label text-label"
						htmlFor="capsule_password"
					>
						Editing Password
					</label>
					<input
						className="add-capsule__input"
						type="password"
						name="capsule_password"
						id="capsule_password"
						placeholder="Type the password to edit capsule"
					/>
				</div>
			</form>
			<MainHeading headingType="default" title="Create Time Capsule" />
			<h2 className="add-capsule__subtitle text-subheading">Memories</h2>
		</main>
	);
}

export default AddCapsulePage;
