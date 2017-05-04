class TableModel {
  constructor(numCols=10, numRows=20) {
    this.numCols = numCols;
    this.numRows = numRows;
    this.data = {};
  }

  _getCellId(location) {
    return `${location.col}:${location.row}`;
  }

  getValue(location) {
    return this.data[this._getCellId(location)];
  }

  setValue(location, value) {
    this.data[this._getCellId(location)] = value;
  }


  getColSum(col){
    let sum = 0;
    for (let row = 0; row < this.numRows; row++){
      const postion = {col: col, row: row};
      let currentCellValue = parseInt(this.getValue(postion), 10);
      if (!isNaN(currentCellValue)) {
        sum += currentCellValue;
      }
    }
    return sum;
  }

  getSumArray() {
    let sumArray = [];
    for (let col = 0; col < this.numCols; col++) {
      sumArray.push(this.getColSum(col));
    }
    return sumArray;
  }

}

module.exports = TableModel;
