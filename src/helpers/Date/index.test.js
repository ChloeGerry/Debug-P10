import { getMonth } from './index';

describe('Date helper', () => {
  describe('When getMonth is called', () => {
    it('should return the proper month', () => {
      const allMonths = [
        {
          number: 1,
          letter: 'janvier',
        },
        {
          number: 2,
          letter: 'février',
        },
        {
          number: 3,
          letter: 'mars',
        },
        {
          number: 4,
          letter: 'avril',
        },
        {
          number: 5,
          letter: 'mai',
        },
        {
          number: 6,
          letter: 'juin',
        },
        {
          number: 7,
          letter: 'juillet',
        },
        {
          number: 8,
          letter: 'août',
        },
        {
          number: 9,
          letter: 'septembre',
        },
        {
          number: 10,
          letter: 'octobre',
        },
        {
          number: 11,
          letter: 'novembre',
        },
        {
          number: 12,
          letter: 'décembre',
        },
      ];

      allMonths.forEach((month) => {
        if (month.number < 10) {
          return expect(
            getMonth(new Date(`2022-0${month.number}-01T20:28:45.744Z`))
          ).toBe(month.letter);
        } else if (month.number >= 10) {
          return expect(
            getMonth(new Date(`2022-${month.number}-01T20:28:45.744Z`))
          ).toBe(month.letter);
        }
      });
    });
  });
});
