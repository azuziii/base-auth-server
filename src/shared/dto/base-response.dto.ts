import { Type } from '@nestjs/common';
// import { ApiProperty } from '@nestjs/swagger';

export class BaseApiResponse<T> {
  public data: T;

  // @ApiProperty({ type: Object })
  meta: any;
}

type ApiPropertyType = Type<unknown> | [new (...arg: any[]) => any];

// export function SwaggerBaseApiResponse<T extends ApiPropertyType>(type: T) {
// 	class ExtendedBaseApiResponse<T> extends BaseApiResponse<T> {
// 		@ApiProperty({ type })
// 		declare public data: T;
// 	}
// 	return ExtendedBaseApiResponse;
// }

class BaseApiErrorObject {
  // @ApiProperty({ type: Number })
  statusCode: number;

  // @ApiProperty({ type: String })
  message: string;

  // @ApiProperty({ type: String })
  errorName: String;

  // @ApiProperty({ type: Object })
  details: unknown;
}

export class BaseApiErrorResponse {
  // @ApiProperty({ type: BaseApiErrorObject })
  public error: BaseApiErrorObject;
}
