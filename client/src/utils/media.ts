import axios from "axios";

const uploadFile = async (file: File) => {
	const { VITE_CLOUD_NAME: cloudName, VITE_PRESET_NAME: preset } = import.meta
		.env;
	const uploadURL = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", preset);

	const { data } = await axios.post(uploadURL, formData);
	const { url } = data;
	return url;
};

export { uploadFile };
