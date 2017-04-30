const { getRange,
        getLetterRange } = require('../array-util');

describe('array-util', () => {

  describe('getRange()', () => {
    it('produces a valid range starting with 0', () => {
      expect(getRange(0,5)).toEqual([0,1,2,3,4,5]);
    });

    it('produces a valid range starting with 1', () => {
      expect(getRange(1, 5)).toEqual([1,2,3,4,5]);
    });

    it('produces a valid negative range', () => {
      expect(getRange(-10,-7)).toEqual([-10,-9,-8,-7]);
    });
  });

  describe('getLetterRange()', () => {
    it('produces a valid single letter range', () => {
      expect(getLetterRange('Q', 1)).toEqual(['Q']);
    });

    it('produces a valid letter range starting at A', () => {
      expect(getLetterRange('A', 5)).toEqual(['A', 'B', 'C', 'D', 'E']);
    });

    it('produces a valid letter range starting at B', () => {
      expect(getLetterRange('B', 5)).toEqual(['B', 'C', 'D', 'E', 'F']);
    });
  })

});
