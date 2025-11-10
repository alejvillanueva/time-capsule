/* eslint-disable @typescript-eslint/no-extraneous-class */
import pool from "../../db/db.js";
import { Capsule } from "../../db/models/capsule.js";
import { buildInsertQuery, buildUpdateQuery } from "./util.js";

export class CapsuleService {
	public static getAllCapsules = async () => {
		try {
			const results = await pool.query("SELECT * FROM capsules");
			return results;
		} catch (error) {
			const message = error instanceof Error ? error.message : "unknown error";
			throw new Error(`Error getting all capsules - ${message}}`);
		}
	};
	public static getCapsule = async (id: number) => {
		try {
			const results = await pool.query(
				`SELECT c.*,
					ARRAY_AGG(
						JSONB_BUILD_OBJECT(
							'id', m.id,
							'author', m.author,
							'medium', m.medium,
							'message', m.message,
							'url', m.url,
							'added_on', m.added_on
						)
					) AS memories
				FROM
					capsules c
				LEFT JOIN
					memories m ON c.id = m.capsule_id
				WHERE
					c.id = $1
				GROUP BY
					c.id;
`,
				[id],
			);
			return results;
		} catch (error) {
			const message = error instanceof Error ? error.message : "unknown error";
			throw new Error(`Error getiting capsule - ${message}}`);
		}
	};
	public static createCapsule = async (c: Capsule) => {
		try {
			const { query, values } = buildInsertQuery("capsules", c);
			const result = await pool.query(query, values);

			return result;
		} catch (error) {
			const message = error instanceof Error ? error.message : "unknown error";
			throw new Error(`Error creating capsule - ${message}}`);
		}
	};
	public static updateCapsule = async (c: Partial<Capsule>) => {
		try {
			const { id } = c;
			if (!id) throw new Error("No ID found");
			const { query, values } = buildUpdateQuery(
				"capsules",
				c,
				`WHERE id = ${id.toString()}`,
			);
			const result = await pool.query(query, values);
			return result;
		} catch (error) {
			const message = error instanceof Error ? error.message : "unknown error";
			throw new Error(`Error updating capsule - ${message}}`);
		}
	};
	public static deleteCapsule = async (id: number) => {
		try {
			const result = await pool.query(
				"DELETE FROM capsules WHERE id = $1 RETURNING id",
				[id],
			);
			return result;
		} catch (error) {
			const message = error instanceof Error ? error.message : "unknown error";
			throw new Error(`Error deleting capsule - ${message}}`);
		}
	};
}
