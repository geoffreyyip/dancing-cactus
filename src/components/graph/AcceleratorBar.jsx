import React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';

const propTypes = {
  onNewAccelerator: React.PropTypes.func.isRequired,
  value: React.PropTypes.number,
};

const defaultProps = {
  value: 0,
};

class AcceleratorBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      max: 500,
    };
  }

  render() {
    return (
      <div className="AcceleratorBar">
        <Slider
          className="AcceleratorBar-Slider"
          label="Accelerator"
          max={this.state.max}
          onChange={(value) => {
            this.setState({ value });
            this.props.onNewAccelerator(value);
          }}
          showValue
          step={this.state.max / 10}
          value={this.state.value}
        />
        <input />
      </div>
    );
  }
}

AcceleratorBar.propTypes = propTypes;
AcceleratorBar.defaultProps = defaultProps;

export default AcceleratorBar;
