import { registerEnumType } from '@nestjs/graphql';

export enum ProjectType {
  INTERNAL = 'internal',
  GLOBAL = 'global',
  STARTUP = 'startup',
}

registerEnumType(ProjectType, {
  name: 'ProjectType',
  description: 'Project Type',
});
