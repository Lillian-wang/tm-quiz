import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';

// Default settings
const SELECT_LABEL = 'Please choose the locked column number:'

class App extends Component {
  constructor() {
    super();
    this.state = {
      // Number of columns we would like to display in the locked state.
      numColumnsLocked: 0,
      // The fields that have been selected and should be displayed in the table.
      selectedFields: [],
      // Names of the selectable fields.
      fieldNames: [],
      tableData: [],
      selectOptions: []
    }
  }

  componentDidMount() {
    fetch('/table').then(result => {
      return result.json();
    }).then(data => {
      // Set can be easily add and delete elements.
      this.selectedCheckboxes = new Set();
      this.setState({ fieldNames: data.fieldNames, tableData: data.tableData })
    })
      .catch(err => console.log(err));
  }

  /** Event handler for selecting checkboxes for individual fields. */
  toggleCheckbox = e => {
    if (this.selectedCheckboxes.has(e.target.value)) {
      this.selectedCheckboxes.delete(e.target.value);
    } else {
      this.selectedCheckboxes.add(e.target.value);
    }
    const selectedFields = Array.from(this.selectedCheckboxes);
    this.setState({
      selectedFields: selectedFields,
      selectOptions: Array.from(Array(selectedFields.length + 1).keys())
    })
  }

  /** Event handler for changing the number of fixed columns. */
  ChangeSelectbox = e => {
    this.setState({ numColumnsLocked: e.target.value })
  }

  clearForm(e) {
    e.preventDefault();
    this.selectedCheckboxes.clear();
    this.setState({ numColumnsLocked: 0, selectedFields: [] })
  }

  render() {
    const lockedHeader = this.state.selectedFields.slice(0, this.state.numColumnsLocked);
    const scollableHeaader = this.state.selectedFields.slice(this.state.numColumnsLocked);

    return (
      <div>
        <form className="table-config-form">
          <legend>Table configurations</legend>
          <div className="field-selections">
            {this.state.fieldNames.map(label => (
              <Checkbox label={label} handleCheckboxChange={this.toggleCheckbox} key={label} isChecked={this.state.isChecked} selectedFields={this.state.selectedFields} />
            ))}
          </div>
          <Selectbox options={this.state.selectOptions} handleSelectboxChange={this.ChangeSelectbox} value={this.state.numColumnsLocked} label={SELECT_LABEL} />
          <button onClick={this.clearForm.bind(this)}>Clear</button>
        </form>
        {(scollableHeaader.length > 0 || lockedHeader.length > 0) &&
          <div className="table-container">
            {lockedHeader.length > 0 &&
              <table className="locked-table">
                <TableHead headNames={lockedHeader} />
                <TableRow tableData={this.state.tableData} numColumnsLocked={this.state.numColumnsLocked} headNames={lockedHeader} />
              </table>
            }
            {scollableHeaader.length > 0 &&
              <table className="scollable-table">
                <TableHead headNames={scollableHeaader} />
                <TableRow tableData={this.state.tableData} numColumnsLocked={this.state.numColumnsLocked} headNames={scollableHeaader} />
              </table>
            }
          </div>
        }
      </div>
    );
  }
}

const Checkbox = (props) => {
  return (
    <label>
      <input className="checkbox-input" type="checkbox" value={props.label} checked={props.selectedFields.indexOf(props.label) > -1} onChange={props.handleCheckboxChange} />
      {props.label}
    </label>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

const Selectbox = (props) => {
  return (
    <label className="selectbox-wrapper"> {props.label}
      <select className="select-input" value={props.value} onChange={props.handleSelectboxChange} >
        {props.options.map(opt => {
          return (
            <option key={opt} value={opt}>
              {opt}
            </option>
          )
        })}
      </select>
    </label>
  );
}

Selectbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleSelectboxChange: PropTypes.func.isRequired,
};

const TableHead = (props) => {
  return (
    <thead className="thead-default">
      <tr>
        {props.headNames.map((headerName, index) => <th className={`column${index}`} key={index}>{headerName}</th>)}
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  headNames: PropTypes.array.isRequired,
};

const TableRow = (props) => {
  return (
    <tbody>
      {props.tableData.map((row, index) =>
        <tr key={index}>
          {props.headNames.map((key, index) =>
            < td key={index} className={`column${index}`}>
              {
                (row['urlLink'] && key === 'url') ? <a href={row['urlLink']}>{row[key]}</a> : row[key]
              }
            </td>
          )}
        </tr>
      )
      }
    </tbody >
  );
}

TableRow.propTypes = {
  headNames: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired
};

export default App;