/// <reference path="../lib/openrct2.d.ts" />

export const isStaff = (peep: Peep): peep is Staff => 'staffType' in peep;
export const isHandyman = (staff: Staff): boolean => staff.staffType === 'handyman';
export const isMechanic = (staff: Staff): boolean => staff.staffType === 'mechanic';
export const isSecurity = (staff: Staff): boolean => staff.staffType === 'security';
export const isEntertainer = (staff: Staff): boolean => staff.staffType === 'entertainer';

export const getPeeps = (): Peep[] => map.getAllEntities('peep');
export const getStaff = (): Staff[] => getPeeps().filter(isStaff);
export const getHandymen = (): Staff[] => getStaff().filter(isHandyman);
export const getMechanics = (): Staff[] => getStaff().filter(isMechanic);
export const getSecurity = (): Staff[] => getStaff().filter(isSecurity);
export const getEntertainers = (): Staff[] => getStaff().filter(isEntertainer);
