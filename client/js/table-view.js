const { getLetterRange } = require('./array-util');
const { removeChildren, createTR, createTH, createTD } = require('./dom-util');

class TableView {
  constructor(model) {
    this.model = model;
  }

  init() {
    this.initDomReferences();
    this.initCurrentCell();
    this.renderTable();
    this.renderTableBody();
    this.renderSumRow();
    this.attachEventHandlers();
  }

  initDomReferences() {
    this.headerRowEl = document.querySelector('THEAD TR');
    this.sheetBodyEl = document.querySelector('TBODY');
    this.formulaBarEl = document.querySelector('#formula-bar');
    this.sumRowEl = document.querySelector('#sum-row')
  }

  initCurrentCell() {
    this.currentCellLocation = {col:0, row: 0};
    this.renderFormulaBar();
  }

  normalizeValueForRendering(value) {
    return value || '';
  }

  renderFormulaBar() {
    const currentCellValue = this.model.getValue(this.currentCellLocation);
    this.formulaBarEl.value = this.normalizeValueForRendering(currentCellValue);
    this.formulaBarEl.focus();
  }

  renderTable() {
    this.renderTableHeader();
    this.renderTableBody();
    this.renderSumRow();
  }

  renderTableHeader() {
    removeChildren(this.headerRowEl);
    getLetterRange('A',this.model.numCols)
      .map(colLabel => createTH(colLabel))
      .forEach(th => this.headerRowEl.appendChild(th));
  }



  isCurrentCell(col, row) {
    return this.currentCellLocation.col === col &&
           this.currentCellLocation.row === row;
  }

  renderTableBody() {
    const fragment = document.createDocumentFragment();
    for (let row = 0; row < this.model.numRows; row++) {
      const tr = createTR();
      for (let col = 0; col < this.model.numCols; col++) {
        const postion = {col: col, row: row};
        const value = this.model.getValue(postion);
        const td = createTD(value);

        if (this.isCurrentCell(col,row)) {
          td.className = 'current-cell';
        }
        tr.appendChild(td);
      }
      fragment.appendChild(tr);
    }
    removeChildren(this.sheetBodyEl);
    this.sheetBodyEl.appendChild(fragment);
  }

  getColSum(col){
    let sum = 0;
    for (let row = 0; row < this.model.numRows; row++){
      const postion = {col: col, row: row};
    //  sum += parseInt(this.model.getValue(postion,10));
      let currentCellValue = parseInt(this.model.getValue(postion),10);
      if (!isNaN(currentCellValue)) {
        sum += currentCellValue;
      }
    }
    return sum;
  }

  getSumArray() {
    let sumArray = [];
    for (let col = 0; col < this.model.numCols; col++ ) {
      sumArray.push(this.getCSum(col));
    }
    return sumArray;
  }


  renderSumRow(){
    removeChildren(this.sumRowEl)
    this.model.getSumArray()
      .map(colLabel => createTD(colLabel))
      .forEach(td => {
        td.className = 'sum-cell';
        this.sumRowEl.appendChild(td);
      });

  }


  attachEventHandlers() {
    this.sheetBodyEl.addEventListener('click', this.handleSheetClick.bind(this));
    this.formulaBarEl.addEventListener('keyup', this.handleFormulaBarChange.bind(this));
  }

  handleFormulaBarChange(evt) {
    const value = this.formulaBarEl.value;
    this.model.setValue(this.currentCellLocation, value);
    this.renderTableBody();
    this.renderSumRow();
  }

  handleSheetClick(evt) {
    const col = evt.target.cellIndex;
    const row = evt.target.parentElement.rowIndex -1;

    this.currentCellLocation = { col: col, row: row};
    this.renderTableBody();
    this.renderFormulaBar();
  }
}


module.exports = TableView;
