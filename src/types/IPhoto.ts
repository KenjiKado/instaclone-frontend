export interface IPhoto {
	id: number;
	author: {
		username: string,
		avatar: string
	};
	url: string;
	description?: string;
	isMine: boolean;
	isLiked: boolean;
	likes: number;
	commentNumber: number;
	createdAt: string;
	updatedAt: string;
}