import axios from "axios";

const {
	VITE_CLOUD_NAME: cloudName,
	VITE_PRESET_NAME: preset,
	VITE_CLOUDINARY_API_KEY: apiKey,
	VITE_CLOUDINARY_API_SECRET: apiSecret,
} = import.meta.env;

const CLOUD_API_URL = `https://api.cloudinary.com/v1_1/${cloudName}`;

const getPublicIdFromUrl = (url: string) => {
	const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
	const match = url.match(regex);
	return match ? match[1] : null;
};

const generateSHA1 = async (data: string) => {
	const encoder = new TextEncoder();
	const buffer = encoder.encode(data);

	const hashBuffer = await crypto.subtle.digest("SHA-1", buffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

const generateSignature = (publicID: string, timestamp: number) => {
	return `public_id=${publicID}&timestamp=${timestamp}${apiSecret}`;
};

const uploadFile = async (file: File) => {
	const uploadEndpoint = `${CLOUD_API_URL}/auto/upload`;

	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", preset);

	const { data } = await axios.post(uploadEndpoint, formData);
	const { url } = data;
	return url;
};

const deleteFile = async (url: string, fileType: string) => {
	const medium = fileType === "video" ? "video" : "image";
	const deleteEndpoint = `${CLOUD_API_URL}/${medium}/destroy`;
	const publicID = getPublicIdFromUrl(url) ?? "";
	const timestamp = new Date().getTime();
	const signature = await generateSHA1(generateSignature(publicID, timestamp));
	try {
		const response = await axios.post(deleteEndpoint, {
			signature,
			timestamp,
			api_key: apiKey,
			public_id: publicID,
		});
		if (response.status === 200) return "Success";
	} catch (error) {
		if (error instanceof Error) console.error("Error!!", error.message);
		else console.log(String(error));
	}
};

export { uploadFile, deleteFile };
