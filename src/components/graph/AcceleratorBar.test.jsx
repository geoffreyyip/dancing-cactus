import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import AcceleratorBar from './AcceleratorBar';
import { Slider } from 'office-ui-fabric-react/lib/Slider';

describe('<AcceleratorBar /> smoke tests', () => {

  const dummyProps = {
    onNewAccelerator: () => {},
    value: 0,
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <AcceleratorBar
        {...dummyProps}
      />
    );
  });

  it('should render without crashing', () => {
    shallow(
      <AcceleratorBar
        {...dummyProps}
      />
    );
  });

  it('should render exactly one Slider', () => {
    expect(wrapper.find(Slider)).to.have.lengthOf(1);
  });
});