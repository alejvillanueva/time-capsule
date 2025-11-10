/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Request, Response, NextFunction } from "express";

import { CapsuleService } from "../services/index.js";
import { Capsule } from "../../db/models/capsule.js";

export class CapsuleController {
	public static getAllCapsules = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const results = await CapsuleService.getAllCapsules();
			const capsules = results.rows;
			res.status(200).send(capsules);
		} catch (error) {
			next(error);
		}
	};

	public static getCapsule = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { id } = req.params;
			const results = await CapsuleService.getCapsule(Number(id));
			const capsule = results.rows;
			res.status(200).send(capsule);
		} catch (error) {
			next(error);
		}
	};

	public static createCapsule = async (
		req: Request<{}, {}, Capsule>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const capsule = req.body;
			const results = await CapsuleService.createCapsule(capsule);
			const newCapsule = results.rows;
			res.status(200).send(newCapsule);
		} catch (error) {
			next(error);
		}
	};

	public static updateCapsule = async (
		req: Request<{}, {}, Partial<Capsule>>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const capsule = req.body;
			const results = await CapsuleService.updateCapsule(capsule);
			const updatedCapsule = results.rows;
			res.status(200).send(updatedCapsule);
		} catch (error) {
			next(error);
		}
	};

	public static deleteCapsule = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const { id } = req.params;
			const results = await CapsuleService.deleteCapsule(Number(id));
			const deletedCapsule = results.rows;
			res.status(204).send(deletedCapsule);
		} catch (error) {
			next(error);
		}
	};
}
