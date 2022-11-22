/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
	export interface Request {
		user: {
			name: string;
			email: string;
			password: string;
			avatarUrl?: string;
		};
		userId: {
			id: string;
		};
		task: {
			name: string;
			description: string;
			date: string;
			hours: number;
		};
	}
}
