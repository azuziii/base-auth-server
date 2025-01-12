import { applyDecorators, SetMetadata } from '@nestjs/common';

export const PUBLIC = 'PUBLIC';

export const Public = () => SetMetadata(PUBLIC, true);
