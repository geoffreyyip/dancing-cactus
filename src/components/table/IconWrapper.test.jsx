import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import IconWrapper from './IconWrapper';

describe('<IconWrapper /> smoke tests', () => {

  const blankProps = {};

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <IconWrapper
        {...blankProps}
      />
    );
  });

  it('should render without crashing', () => {
    shallow(<IconWrapper />);
  });

  it('should render zero children with no props', () => {
    expect(wrapper.children()).to.have.lengthOf(0);
  });

});