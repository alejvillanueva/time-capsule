/* eslint-disable @typescript-eslint/no-extraneous-class */
import Pool from "../../db/db";
import { Memory } from "../../db/models/memory";

export class MemoryService {
	public static getMemory = async (id: number) => {
		try {
			const results = await Pool.query("SELECT * FROM memories WHERE id = $1", [
				id,
			]);
			return results;
		} catch (error) {
			const message = error instanceof Error ? error.message : "unknown error";
			throw new Error(`Error getting memory - ${message}}`);
		}
	};

	public static createMemory = async (m: Memory) => {
		try {
		} catch (error) {
			const message = error instanceof Error ? error.message : "unknown error";
			throw new Error(`Error creating memory - ${message}}`);
		}
	};

	public static updateMemory = async (m: Memory) => {
		try {
		} catch (error) {
			const message = error instanceof Error ? error.message : "unknown error";
			throw new Error(`Error updating memory - ${message}}`);
		}
	};

	public static deleteMemory = async (id: number) => {
		try {
		} catch (error) {
			const message = error instanceof Error ? error.message : "unknown error";
			throw new Error(`Error deleting memory - ${message}}`);
		}
	};
}
