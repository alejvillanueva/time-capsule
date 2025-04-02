import { Capsule } from "../../db/models/capsule.js";
import { Memory } from "../../db/models/memory.js";

export const buildUpdateQuery = (
	table: string,
	updateData: Memory | Capsule,
	condition: string,
) => {
	const keys = Object.keys(updateData);
	const values = Object.values(updateData);

	const setClause = keys
		.map((key, index) => `${key} = $${String(index + 1)}`)
		.join(", ");

	const query = `UPDATE ${table} SET ${setClause} WHERE ${condition} RETURNING *`;

	return { query, values };
};

export const buildInsertQuery = (
	table: string,
	insertData: Memory | Capsule,
) => {
	const keys = Object.keys(insertData).join(", ");
	const values = Object.values(insertData);

	const valuesString = values
		.map((value, index) => `$${String(index + 1)}`)
		.join(", ");

	const query = `INSERT INTO ${table} (${keys}) VALUES (${valuesString}) RETURNING *`;

	return { query, values };
};
