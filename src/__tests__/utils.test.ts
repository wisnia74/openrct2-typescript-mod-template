import { createMockStaff } from '~/testUtils';
import * as utils from '../utils';

describe('utils', () => {
  describe('isHandyman', () => {
    it('returns true if staff member is a handyman', () => {
      expect(utils.isHandyman(createMockStaff('handyman'))).toBe(true);
    });
  });

  describe('isMechanic', () => {
    it('returns true if staff member is a mechanic', () => {
      expect(utils.isMechanic(createMockStaff('mechanic'))).toBe(true);
    });
  });

  describe('isSecurity', () => {
    it('returns true if staff member is a security guard', () => {
      expect(utils.isSecurity(createMockStaff('security'))).toBe(true);
    });
  });

  describe('isEntertainer', () => {
    it('returns true if staff member is an entertainer', () => {
      expect(utils.isEntertainer(createMockStaff('entertainer'))).toBe(true);
    });
  });

  describe('getHandymen', () => {
    it('returns all handymen in the park', () => {
      const result = utils.getHandymen();

      expect(result).toHaveLength(5);
      expect(result.every((entity) => entity.staffType === 'handyman')).toBe(true);
    });
  });

  describe('getMechanics', () => {
    it('returns all mechanic in the park', () => {
      const result = utils.getMechanics();

      expect(result).toHaveLength(4);
      expect(result.every((entity) => entity.staffType === 'mechanic')).toBe(true);
    });
  });

  describe('getSecurity', () => {
    it('returns all security guards in the park', () => {
      const result = utils.getSecurity();

      expect(result).toHaveLength(2);
      expect(result.every((entity) => entity.staffType === 'security')).toBe(true);
    });
  });

  describe('getEntertainers', () => {
    it('returns all entertainers in the park', () => {
      const result = utils.getEntertainers();

      expect(result).toHaveLength(3);
      expect(result.every((entity) => entity.staffType === 'entertainer')).toBe(true);
    });
  });
});
