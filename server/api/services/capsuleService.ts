/* eslint-disable @typescript-eslint/no-extraneous-class */
import Pool from "../../db/db";
import { Capsule } from "../../db/models/capsule";

export class CapsuleService {
	public static getAllCapsules = async () => {
		try {
		} catch (error) {
			const message = error instanceof Error ? error.message : "unknown error";
			throw new Error(`Error getting all capsules - ${message}}`);
		}
	};
	public static getCapsule = async (id: number) => {
		try {
		} catch (error) {
			const message = error instanceof Error ? error.message : "unknown error";
			throw new Error(`Error getiting capsule - ${message}}`);
		}
	};
	public static createCapsule = async (c: Capsule) => {
		try {
		} catch (error) {
			const message = error instanceof Error ? error.message : "unknown error";
			throw new Error(`Error creating capsule - ${message}}`);
		}
	};
	public static updateCapsule = async (c: Capsule) => {
		try {
		} catch (error) {
			const message = error instanceof Error ? error.message : "unknown error";
			throw new Error(`Error updating capsule - ${message}}`);
		}
	};
	public static deleteCapsule = async (id: number) => {
		try {
		} catch (error) {
			const message = error instanceof Error ? error.message : "unknown error";
			throw new Error(`Error deleting capsule - ${message}}`);
		}
	};
}
