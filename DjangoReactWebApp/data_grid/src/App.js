import React, { Component } from 'react';
import update from 'immutability-helper';
import 'bootstrap/dist/css/bootstrap.css';
const ReactDataGrid = require('react-data-grid');
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');


class App extends Component {
  constructor(props, context) {
    super(props, context)

    this._columns = [
      {
        key: 'schema_version',
        name: 'schema_version',
        resizable: true,
        editable: true,
        sortable: true,
        filterable: true
      },
      {
      key: 'tablName',
      name: 'tablName',
      resizable: true,
      editable: true,
      sortable: true,
      filterable: true
      },
      {
      key: 'isarray',
      name: 'isarray',
      width: 60,
      resizable: true,
      editable: true,
      sortable: true,
      filterable: true
      },
      {
      key: 'lvl',
      name: 'lvl',
      width: 40,
      resizable: true,
      editable: true,
      sortable: true,
      filterable: true
      },
      {
      key: 'fullPath',
      name: 'fullPath',
      resizable: true,
      editable: true,
      sortable: true,
      filterable: true
      },
      {
      key: 'name',
      name: 'name',
      resizable: true,
      editable: true,
      sortable: true,
      filterable: true
      },
    ]
    /*
    let originalRows = [];
    console.log("originalRows" + originalRows)
    let rows = originalRows.slice(0);
    */

    this.state = {
        originalRows: [],
        rows: [],
        filters: {},
        selectedIndexes: [],
        selectedRows: [] };
  }

// Асинхронно загружаем данные
async loadRows() {
  await fetch('http://localhost:8000/api/v0/hive/', {
          headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        })
        .then(result => result.json())
        // .then(data => console.log(data))
        .then(rowData => this.setState ({originalRows: rowData, rows: rowData.slice(0)}))

    }

componentDidMount () {
  this.loadRows()
}

  // Метод для выбора строк
  getRows = () => {
    return Selectors.getRows(this.state);
  };

  getSize = () => {
    return this.getRows().length;
  };

  rowGetter = (rowIdx) => {
    let rows = this.getRows();
    return rows[rowIdx];
  };
  // Метод для обновления строк
  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;
    }

    this.setState({ rows });
  }
  // Метод для сортировки
  handleGridSort = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    }
    const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

    this.setState({ rows });
  };

  // Методы для фильтрации
  handleFilterChange = (filter) => {
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.setState({ filters: newFilters });
  };

  onClearFilters = () => {
    // all filters removed
    this.setState({filters: {} });
  };

  // Методы для выбора строк
  onRowsSelected = (rows) => {
    this.setState({selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx))});
    this.setState({selectedRows: this.state.selectedRows.concat(rows)});
  };

  onRowsDeselected = (rows) => {
    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});
    this.setState({selectedRows: this.state.selectedRows.filter(rows => rows.rowIdx !== rowIndexes[0] )});
  };


  render() {
    return  (
      <div>
        <ReactDataGrid
          enableCellSelect={true}
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.getSize()}
          minHeight={500}
          minColumnWidth={120}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          onGridSort={this.handleGridSort}
          toolbar={<Toolbar enableFilter={true}/>}
          onAddFilter={this.handleFilterChange}
          onClearFilters={this.onClearFilters}
          rowSelection={{
              showCheckbox: true,
              columnWidth: 20,
              enableShiftSelect: true,
              onRowsSelected: this.onRowsSelected,
              onRowsDeselected: this.onRowsDeselected,
              selectBy: {
                indexes: this.state.selectedIndexes
              }
            }}
          />
          <button
            onClick={()=>{
              var data = []
              this.state.selectedRows.forEach(function(item, i, arr) {
                    data.push(item.row)
                  })
                  console.log(data)
                  fetch('http://localhost:8000/api/v0/hive/', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify(data)
                            })
            }}
            className="btn btn-primary btn-lg">
            Submit
          </button>
        </div>);
  }
}

export default App;
