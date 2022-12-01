import {SetMetadata} from "@nestjs/common";

export const TYPES_KEY = 'types';

export const Types = (...roles: string[]) => SetMetadata(TYPES_KEY, roles);