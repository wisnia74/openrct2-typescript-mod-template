/* eslint-disable @typescript-eslint/no-empty-function */

export default (staffType: StaffType): Staff => ({
  peepType: 'staff',
  staffType,
  colour: 0,
  costume: 0,
  orders: 0,
  patrolArea: {
    tiles: [],
    clear: (): void => {},
    add: (): void => {},
    remove: (): void => {},
    contains: (): boolean => true,
  },
  name: 'test',
  destination: {
    x: 0,
    y: 0,
  },
  energy: 0,
  energyTarget: 0,
  getFlag: () => true,
  setFlag: () => true,
  id: 0,
  type: 'staff',
  x: 0,
  y: 0,
  z: 0,
  remove: (): void => {},
});
