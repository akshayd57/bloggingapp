import { SetMetadata } from '@nestjs/common';


export const Roles = (...roles: string[]) => SetMetadata("role", roles);

console.log("...roles", Roles)