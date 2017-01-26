import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import LineWrapper from './LineWrapper';

describe('<LineWrapper /> smoke tests', () => {

  const blankProps = {};

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <LineWrapper
        {...blankProps}
      />
    );
  });

  it('should render without crashing', () => {
    shallow(<LineWrapper />);
  });

  it('should render zero children with no props', () => {
    expect(wrapper.children()).to.have.lengthOf(0);
  });

});