const fs = require('fs');
const TableModel = require('../table-model');
const TableView = require('../table-view');

describe('table-view', () => {

  beforeEach(() => {
    //load HTML skeleton from disk and parse into dom
    const fixturePath = './client/js/test/fixtures/sheet-container.html'
    const html = fs.readFileSync(fixturePath, 'utf8');
    document.documentElement.innerHTML = html;
  });

  describe('Sum row', () => {
    it('makes a row of sums', () => {
      //set up intial state
      const model = new TableModel(6,6);
      const view = new TableView(model);
      view.init();
      //inspect intial state
      let sumRow = document.querySelectorAll('#sum-cell');
      expect(sumRow[2]).toBe(undefined);
      //simulate user action
      model.setValue({col: 2, row: 1}, '2');
      model.setValue({col: 2, row: 2}, '2');
      //inspect the resulting state
      expect(sumRow[2]).toBe(4);

    });
  });




  describe('formula bar', () => {
    it('makes changes TO the value of the current cell', () => {
      //set up the initial state
      const model = new TableModel(3,3);
      const view = new TableView(model);
      view.init();

      //inspect the intial state
      let trs = document.querySelectorAll('TBODY TR');
      let td = trs[0].cells[0];
      expect(td.textContent).toBe('');
      //simulate user action
      document.querySelector('#formula-bar').value = '65';
      view.handleFormulaBarChange();

      //inspect the resulting state
      trs = document.querySelectorAll('TBODY TR');
      expect(trs[0].cells[0].textContent).toBe('65');
    });

    it('updates FROM the value of the current', () => {
      //set up intial state
      const model = new TableModel(3,3);
      const view = new TableView(model);
      model.setValue({col: 2, row: 1}, '123');
      view.init();

      //inspect intial state
      const formulaBarEl = document.querySelector('#formula-bar')
      expect(formulaBarEl.value).toBe('');

      //simulate user action
      const trs = document.querySelectorAll('TBODY TR');
      trs[1].cells[2].click();
      //inspect the resulting state
      expect(formulaBarEl.value).toBe('123');
    });
  });

  describe('table body', () => {
    it('highlights the current cell when clicked', () => {
      //sets up the initial state
      const model = new TableModel(10,5);
      const view = new TableView(model);
      view.init();

      //inspect the intial state
      let trs = document.querySelectorAll('TBODY TR');
      let td = trs[2].cells[3];
      expect(td.className).toBe('');

      //simulate user action
      td.click();

      //inspect the resulting state
      trs = document.querySelectorAll('TBODY TR');
      td = trs[2].cells[3];
      expect(td.className).not.toBe('');
    });

    it('has the right size', () => {
      //set up intial state

      const numCols = 6;
      const numRows = 10;
      const model = new TableModel(numCols, numRows);
      const view = new TableView(model);
      view.init();
      //inspect intial state
      let ths = document.querySelectorAll('THEAD TH');
      expect(ths.length).toBe(numCols);
    });

    it('fills in the values from the model', () => {
      //set up intial state
      const model = new TableModel(3,3);
      const view = new TableView(model);
      model.setValue({col: 2, row: 1}, '123');
      view.init();

      //inspect intial state
      const trs = document.querySelectorAll('TBODY TR');
      expect(trs[1].cells[2].textContent).toBe('123');
    });
  });


  describe('table header', () => {
    it('has valid colum header labels', () => {
      //set up intial state
      const numCols = 6;
      const numRows = 10;
      const model = new TableModel(numCols, numRows);
      const view = new TableView(model);
      view.init();

      // inspect intial state;
      let ths = document.querySelectorAll('THEAD TH');
      expect(ths.length).toBe(numCols);

      let labelTexts = Array.from(ths).map(el => el.textContent);
      expect(labelTexts).toEqual(['A','B','C','D','E','F'])
    });
  });
});
