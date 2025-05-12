export type Medium = "image" | "text" | "video";

export interface Memory {
	author: string;
	capsule_id: number;
	added_on: Date;
	id?: number;
	medium: Medium;
	message?: string | null;
	url?: string | null;
}
