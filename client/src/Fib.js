import React, { Component } from 'react';
import axios from 'axios';
import './Fib.css'

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data
    });
  }

  handleSubmit = async (event) => {
    /*     event.preventDefault(); */

    await axios.post('/api/values', {
      index: this.state.index
    });
    this.setState({ index: '' });
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index <span className="Fib-calc"/* style={{color: 'rgb(186,76,99)'}} */>{key}</span> I have calculated{' '}
          <span className="Fib-calc"/* style={{color: 'rgb(186,76,99)'}} */>{this.state.values[key]}</span>
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>
        <h3>Indexes I have seen:</h3>
        <span className="Fib-calc"/* style={{color: 'rgb(186,76,99'}} */>{this.renderSeenIndexes()}</span>

        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
