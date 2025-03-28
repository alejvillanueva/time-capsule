export type Medium = "image" | "text" | "video";

export interface Memory {
	author: string;
	capsuleID: number;
	createdOn: Date;
	id: number;
	medium: Medium;
	message?: string | null;
	url?: string | null;
}
