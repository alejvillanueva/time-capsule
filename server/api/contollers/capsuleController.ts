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
			const capsules = await CapsuleService.getAllCapsules();
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
			const capsule = await CapsuleService.getCapsule(Number(id));
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
			const newCapsule = await CapsuleService.createCapsule(capsule);
			res.status(200).send(newCapsule);
		} catch (error) {
			next(error);
		}
	};

	public static updateCapsule = async (
		req: Request<{}, {}, Capsule>,
		res: Response,
		next: NextFunction,
	) => {
		try {
			const capsule = req.body;
			const updatedCapsule = await CapsuleService.updateCapsule(capsule);
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
			const capsuleID = await CapsuleService.deleteCapsule(Number(id));
			res.status(200).send(capsuleID);
		} catch (error) {
			next(error);
		}
	};
}
