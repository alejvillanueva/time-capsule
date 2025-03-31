/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Request, Response, NextFunction } from "express";

import { MemoryService } from "../services";

export class MemoryController {
	public static getMemory = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		try {
		} catch (error) {
			next(error);
		}
	};

	public static updateMemory = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		try {
		} catch (error) {
			next(error);
		}
	};

	public static createMemory = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		try {
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
		} catch (error) {
			next(error);
		}
	};
}
