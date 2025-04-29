/* eslint-disable @typescript-eslint/no-extraneous-class */
import pool from "../../db/db.js";
import { Memory } from "../../db/models/memory.js";
import { buildUpdateQuery, buildInsertQuery } from "./util.js";

export class MemoryService {
	public static getMemory = async (id: number) => {
		try {
			const results = await pool.query("SELECT * FROM memories WHERE id = $1", [
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
			const { query, values } = buildInsertQuery("memories", m);
			const result = await pool.query(query, values);

			return result;
		} catch (error) {
			const message = error instanceof Error ? error.message : "unknown error";
			throw new Error(`Error creating memory - ${message}}`);
		}
	};

	public static updateMemory = async (m: Memory) => {
		try {
			const { id } = m;
			if (!id) throw new Error("No ID found");

			const { query, values } = buildUpdateQuery(
				"memories",
				m,
				`WHERE id = ${id.toString()}`,
			);
			const result = await pool.query(query, values);

			return result;
		} catch (error) {
			const message = error instanceof Error ? error.message : "unknown error";
			throw new Error(`Error updating memory - ${message}}`);
		}
	};

	public static deleteMemory = async (id: number) => {
		try {
			const result = await pool.query(
				"DELETE FROM memories WHERE id = $1 RETURNING id",
				[id],
			);
			return result;
		} catch (error) {
			const message = error instanceof Error ? error.message : "unknown error";
			throw new Error(`Error deleting memory - ${message}}`);
		}
	};
}
