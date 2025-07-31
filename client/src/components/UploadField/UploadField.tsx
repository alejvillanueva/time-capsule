import "./UploadField.scss";
import { useDropzone, FileWithPath } from "react-dropzone";
import { useRef } from "react";

interface UploadFieldProps {
	uploadLabel: string;
	uploadName: string;
	uploadId: string;
	acceptedTypes?: {
		[key: string]: string[];
	};
	onFileChange: (files: FileWithPath[]) => void;
}

function UploadField({
	uploadLabel,
	uploadName,
	uploadId,
	acceptedTypes,
	onFileChange,
}: UploadFieldProps) {
	const hiddenInputRef = useRef<HTMLInputElement | null>(null);
	const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
		// TODO: change accepted types conditionally based on medium of upload field ("image" versus "video")
		accept: acceptedTypes || {
			"image/png": [".png"],
			"image/jpeg": [".jpg", ".jpeg"],
			"image/webp": [".webp"],
		},
		onDrop: (incomingFile) => {
			const dataTransfer = new DataTransfer();
			incomingFile.forEach((file) => dataTransfer.items.add(file));

			if (hiddenInputRef.current) {
				hiddenInputRef.current.files = dataTransfer.files;
			}
			onFileChange(incomingFile);
		},
	});

	return (
		<div className="upload-field">
			<label className="upload-field__label text-label" htmlFor={uploadId}>
				{uploadLabel}
			</label>
			{/* TODO: add state and styling for when image is uploaded, but upload field is available, refer to AddEditCapsulePage + MemoryModal components */}
			<div
				className="upload-field__drop-zone"
				role="button"
				tabIndex={0}
				aria-label="Upload a file by dragging or clicking"
				{...getRootProps()}
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
					// TODO: change accepted types conditionally based on medium of upload field ("image" versus "video")
					<p className="upload-field__drop-text upload-field__drop-text--light text-body">
						(jpg, jpeg, png, webp)
					</p>
				)}
				<input
					type="file"
					name={uploadName}
					id={uploadId}
					style={{ opacity: 0 }}
					ref={hiddenInputRef}
				/>
				<input {...getInputProps()} />
			</div>
		</div>
	);
}

export default UploadField;
