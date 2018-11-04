import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDataSheet from 'react-datasheet'
import 'react-datasheet/lib/react-datasheet.css'

class App extends Component {
  constructor (props) {
    super(props)

    // Данные в виде набора трок и ячеек
    this.state = {
      grid: [
        [{value:1}, {value:2}, {value:''}],
        [{value:3}, {value:4}, {value:''}],
        [{value:3}, {value:4}, {value:'Component'}]
      ],
      checked: [],
      cols:[1,2,3]
    }
  }

  {"id":1,"schema_version":"2_0","tablName":"changerequirements","isarray":false,"lvl":0,"fullPath":"uid","name":"uid"}

  selectHandler = (row) => {
    var ch = this.state.checked.slice()
    ch.push(row)
    this.setState({checked: ch})
    console.log(this.state.checked)
  }



  // https://stackoverflow.com/questions/44339747/what-is-this-prop-syntax-in-my-component
  render (){
    return (
    <div>
      <ReactDataSheet
        data={this.state.grid}
        valueRenderer={(cell) => cell.value}

        rowRenderer={props => (
              <tr>
                  <td className='action-cell'>
                      <input
                        type='checkbox'
                        onChange={()=>this.selectHandler(props.cells)}
                      />
                  </td>
                  {props.children}
              </tr>
            )}

            sheetRenderer={props => (
            <table>
                <thead>
                    <tr>
                        <th className='action-cell' />
                        {this.state.cols.map(col => (<th>{col}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {props.children}
                </tbody>
            </table>
          )}

        onCellsChanged={changes => {
          const grid = this.state.grid.map(row => [...row])
          changes.forEach(({cell, row, col, value}) => {
            grid[row][col] = {...grid[row][col], value}
          })
          this.setState({grid})
        }
      }
      />
      <button
        onClick={()=>fetch('https://mywebsite.com/endpoint/', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.state.grid)
                  })}>
        POST request
      </button>
    </div>
  );
  }

}

export default App;
