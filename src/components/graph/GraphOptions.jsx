import React from 'react';

class GraphOptions extends React.Component {
  constructor(props) {
    super(props);
    this.waterfall = 'waterfall';
    this.snowball = 'snowball';
    this.state = { selectedOption: this.waterfall };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ selectedOption: event.target.value });
  }

  // radio buttons toggle in a group; groups are determined by name property
  render() {
    return (
      <form>
        <label htmlFor={this.waterfall}>
          Waterfall
          <input
            id={this.waterfall}
            type="radio"
            value={this.waterfall}
            onChange={this.handleChange}
            checked={this.state.selectedOption === 'waterfall'}
          />
        </label>
        <label htmlFor={this.snowball}>
          Snowball
          <input
            id={this.snowball}
            type="radio"
            value={this.snowball}
            onChange={this.handleChange}
            checked={this.state.selectedOption === 'snowball'}
          />
        </label>
        <p>{this.state.value}</p>
      </form>
    );
  }
}

export default GraphOptions;
