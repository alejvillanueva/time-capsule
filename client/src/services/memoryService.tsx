import client from "./api";
import { Memory } from "../interfaces";

const endpoint = "/memories";

export const getMemory = async (id: number) => {
	try {
		const { data } = await client.get(`${endpoint}/${id}`);
		return data;
	} catch (error) {
		console.error("Error getting memory", error);
	}
};
export const createMemory = async (memory: Memory) => {
	try {
		const { data } = await client.post(`${endpoint}/`, memory);
		return data;
	} catch (error) {
		console.error("Error creating memory: ", error);
	}
};
export const updateMemory = async (memory: Partial<Memory>) => {
	try {
		const { id } = memory;
		const { data } = await client.put(`${endpoint}/${id}`, memory);
		return data;
	} catch (error) {
		console.error("Error updating memory: ", error);
	}
};
export const deleteMemory = async (id: number) => {
	try {
		const data = await client.delete(`${endpoint}/${id}`);
		return data.status; // 204 for success
	} catch (error) {
		console.error("Error deleting memory: ", error);
	}
};
