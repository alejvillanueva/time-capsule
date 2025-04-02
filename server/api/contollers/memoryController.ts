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
			const memory = await MemoryService.getMemory(Number(id));
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
			const newMemory = await MemoryService.createMemory(memory);
			res.status(200).send(newMemory);
		} catch (error) {
			next(error);
		}
	};

	public static updateMemory = async (
		req: Request<{}, {}, Memory>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const memory = req.body;
			const updatedMemory = await MemoryService.updateMemory(memory);
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
			const memoryID = await MemoryService.deleteMemory(Number(id));
			res.status(200).send(memoryID);
		} catch (error) {
			next(error);
		}
	};
}
