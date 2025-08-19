import "./UploadField.scss";
import { useDropzone, FileWithPath } from "react-dropzone";
import { useState } from "react";
import Button from "../Button/Button";
import useAppContext from "../../context/useAppContext";

interface UploadFieldProps {
	uploadLabel: string;
	uploadName: string;
	uploadId: string;
	fileUrl?: string;
	acceptedTypes?: {
		[key: string]: string[];
	};
	onFileChange: (files: FileWithPath[]) => void;
	uploadType: "cover" | "video" | "image";
}

function UploadField({
	uploadLabel,
	uploadName,
	uploadId,
	fileUrl,
	acceptedTypes,
	onFileChange,
	uploadType,
}: UploadFieldProps) {
	const { isFormEditable, isMemoryFormEditable } = useAppContext();
	const [mediaUrl, setMediaUrl] = useState(fileUrl);
	const { getRootProps, getInputProps } = useDropzone({
		accept: acceptedTypes || {
			"image/png": [".png"],
			"image/jpeg": [".jpg", ".jpeg"],
			"image/webp": [".webp"],
		},
		onDrop: (incomingFile) => {
			const dataTransfer = new DataTransfer();
			incomingFile.forEach((file) => dataTransfer.items.add(file));

			const media = incomingFile[0];
			const url = URL.createObjectURL(media);
			setMediaUrl(url);

			onFileChange(incomingFile);
		},
	});

	const handleRemoveClick = () => {
		setMediaUrl("");
		// TODO: update event handler once removeFile function created
		// TODO: delete url from database as well
	};

	return (
		<div className="upload-field">
			<label className="upload-field__label text-label" htmlFor={uploadId}>
				{uploadLabel}
			</label>
			{mediaUrl ? (
				<div className="upload-field__image-container">
					{uploadType === "video" ? (
						<video
							className="upload-field__video"
							src={mediaUrl}
							controls
						></video>
					) : (
						<img
							className={`upload-field__image  ${uploadType === "cover" ? "upload-field__image--cover-art" : ""}`}
							src={mediaUrl}
						/>
					)}
					{(isFormEditable || isMemoryFormEditable) && (
						<div className="upload-field__button-container">
							<div
								{...getRootProps({
									className: "upload-field__replace text-label",
									role: "button",
									tabIndex: 0,
									"aria-label": "Replace file",
								})}
							>
								Replace
								<input
									{...getInputProps({
										type: "file",
										name: uploadName,
										id: uploadId,
									})}
								/>
							</div>
							<Button buttonText="Remove" click={handleRemoveClick} />
						</div>
					)}
				</div>
			) : (
				<div
					{...getRootProps({
						className: "upload-field__drop-zone",
						role: "button",
						tabIndex: 0,
						"aria-label": "Upload a file by dragging or clicking",
					})}
				>
					<svg
						className="upload-field__icon"
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
					<p className="upload-field__drop-text text-body">
						Drag and drop file here,
					</p>
					<p className="upload-field__drop-text text-body">
						or click to select file
					</p>
					{acceptedTypes ? (
						<p className="upload-field__drop-text upload-field__drop-text--light text-body">
							{`(${Object.values(acceptedTypes)
								.join(",")
								.replace(/\./g, " ")
								.trim()})`}
						</p>
					) : (
						<p className="upload-field__drop-text upload-field__drop-text--light text-body">
							(jpg, jpeg, png, webp)
						</p>
					)}
					<input
						{...getInputProps({
							type: "file",
							name: uploadName,
							id: uploadId,
						})}
					/>
				</div>
			)}
		</div>
	);
}

export default UploadField;
