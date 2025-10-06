import client from "./api";
import { Capsule } from "../interfaces";

const endpoint = "/capsules";

export const getAllCapsules = async () => {
	try {
		const { data } = await client.get(`${endpoint}/all`);
		return data;
	} catch (error) {
		console.error("Error getting capsules: ", error);
	}
};
export const getCapsule = async (id: number) => {
	try {
		const { data } = await client.get(`${endpoint}/${id}`);
		return data;
	} catch (error) {
		console.error("Error getting capsule: ", error);
	}
};
export const createCapsule = async (capsule: Capsule) => {
	try {
		const { data } = await client.post(`${endpoint}/`, capsule);
		return data;
	} catch (error) {
		console.error("Error creating capsule: ", error);
	}
};
export const updateCapsule = async (capsule: Partial<Capsule>) => {
	try {
		const { id } = capsule;
		const { data } = await client.put(`${endpoint}/${id}`, capsule);
		return data;
	} catch (error) {
		console.error("Error updating capsule: ", error);
	}
};
export const deleteCapsule = async (id: number) => {
	try {
		const data = await client.delete(`${endpoint}/${id}`);
		return data.status; // 204 for success
	} catch (error) {
		console.error("Error deleting capsule: ", error);
	}
};
