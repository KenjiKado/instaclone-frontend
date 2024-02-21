export interface IComment {
	id: number;
	user: {
		username: string;
		avatar: string;
	}
	isMine: boolean;
	text: string;
	createdAt: string;
}