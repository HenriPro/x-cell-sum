const TableModel = require('../table-model');

describe('Sum Row', () => {
  describe('getColSum', () => {
    it('returns sum of two elements', () => {
      //set up intial state
      const model = new TableModel(3,3);
      model.setValue({col: 2, row: 1}, '2');
      model.setValue({col: 2, row: 2}, '2');

      //check sum of col
      expect(model.getColSum(2)).toBe(4);
    });
  });

  describe('get Sum Array', () => {
    it('returns array of correct length with correct sum for 2 rows', () => {
      //set up intial state
      const model = new TableModel(4,4);
      model.setValue({col: 2, row: 1}, '2');
      model.setValue({col: 2, row: 2}, '2');
      model.setValue({col: 3, row: 1}, '3');
      model.setValue({col: 3, row: 2}, '3');

      //check sum array
      expect(model.getSumArray()).toEqual([0,0,4,6]);

    });
    it('returns array of correct length with correct sum for 2 rows, ignoring strings', () => {
      //set up intial state
      const model = new TableModel(4,4);
      model.setValue({col: 0, row: 0}, 'adsfasfasdf');
      model.setValue({col: 2, row: 0}, 'adsfdasfdasf');
      model.setValue({col: 2, row: 1}, '2');
      model.setValue({col: 2, row: 2}, '2');
      model.setValue({col: 3, row: 1}, '3');
      model.setValue({col: 3, row: 2}, '3');

      //check sum array
      expect(model.getSumArray()).toEqual([0,0,4,6]);
    });
  });
});

describe('table-model', () => {

  it('can set then get a value', () => {
    // set up the intial state
    const model = new TableModel();
    const location = { row: 3, col: 5};

    // inspect the intial state
    expect(model.getValue(location)).toBeUndefined();

    // execute code under test
    model.setValue(location, 'foo');

    // inspect the resulting state
    expect(model.getValue(location)).toBe('foo');
  });
});
