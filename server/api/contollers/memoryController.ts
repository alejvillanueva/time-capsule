/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Request, Response, NextFunction } from "express";

import { MemoryService } from "../services/index.js";
import { Memory } from "../../db/models/memory.js";

export class MemoryController {
	public static getMemory = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { id } = req.params;
			const results = await MemoryService.getMemory(Number(id));
			const memory = results.rows;
			res.status(200).send(memory);
		} catch (error) {
			next(error);
		}
	};

	public static createMemory = async (
		req: Request<{}, {}, Memory>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const memory = req.body;
			const results = await MemoryService.createMemory(memory);
			const newMemory = results.rows;
			res.status(200).send(newMemory);
		} catch (error) {
			next(error);
		}
	};

	public static updateMemory = async (
		req: Request<{}, {}, Partial<Memory>>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const memory = req.body;
			const results = await MemoryService.updateMemory(memory);
			const updatedMemory = results.rows;
			res.status(200).send(updatedMemory);
		} catch (error) {
			next(error);
		}
	};

	public static deleteMemory = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { id } = req.params;
			const results = await MemoryService.deleteMemory(Number(id));
			const deletedMemory = results.rows;
			res.status(204).send(deletedMemory);
		} catch (error) {
			next(error);
		}
	};
}
