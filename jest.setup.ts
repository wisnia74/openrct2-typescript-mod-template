/* eslint-disable @typescript-eslint/no-empty-function */

import { createMockStaff } from './testUtils';

function mockGetAllEntities(type: EntityType): Entity[];
function mockGetAllEntities(type: 'peep'): Peep[];
function mockGetAllEntities(type: 'guest'): Guest[];
function mockGetAllEntities(type: 'staff'): Staff[];
function mockGetAllEntities(type: 'car'): Car[];
function mockGetAllEntities(type: 'litter'): Litter[];
function mockGetAllEntities(): Entity[] {
  return [
    createMockStaff('handyman'),
    createMockStaff('handyman'),
    createMockStaff('handyman'),
    createMockStaff('handyman'),
    createMockStaff('handyman'),
    createMockStaff('entertainer'),
    createMockStaff('entertainer'),
    createMockStaff('entertainer'),
    createMockStaff('security'),
    createMockStaff('security'),
    createMockStaff('mechanic'),
    createMockStaff('mechanic'),
    createMockStaff('mechanic'),
    createMockStaff('mechanic'),
  ];
}

global.map = { getAllEntities: mockGetAllEntities } as GameMap;
