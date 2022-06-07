export const isHandyman = (staff: Staff): boolean => staff.staffType === 'handyman';
export const isMechanic = (staff: Staff): boolean => staff.staffType === 'mechanic';
export const isSecurity = (staff: Staff): boolean => staff.staffType === 'security';
export const isEntertainer = (staff: Staff): boolean => staff.staffType === 'entertainer';

export const getHandymen = (): Staff[] => map.getAllEntities('staff').filter(isHandyman);
export const getMechanics = (): Staff[] => map.getAllEntities('staff').filter(isMechanic);
export const getSecurity = (): Staff[] => map.getAllEntities('staff').filter(isSecurity);
export const getEntertainers = (): Staff[] => map.getAllEntities('staff').filter(isEntertainer);
