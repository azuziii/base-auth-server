import { HttpException } from '@nestjs/common';

export class BaseApiException extends HttpException {
	constructor(
		message: string,
		status: number,
		public details?: string | Record<string, any>,
		public localizedMessage?: Record<string, any>,
	) {
		super(message, status);
	}
}
