import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import MorphingBar from './MorphingBar';
import IconWrapper from './IconWrapper';

describe('<MorphingBar /> smoke tests', () => {
  const dummyProps = {
    onDeleteChanges: () => {},
    onSaveChanges: () => {},
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <MorphingBar
        {...dummyProps}
      />
    );
  });

  it('should render without crashing', () => {
    shallow(
      <MorphingBar
        {...dummyProps}
      />
    );
  });

  it('should render exactly two `.button`', () => {
    expect(wrapper.children().find('.button')).to.have.lengthOf(2);
  });

  it('should render exactly two <icon>', () => {
    expect(wrapper.children().find('icon')).to.have.lengthOf(2);
  });

  it('should render one IconWrapper', () => {
    expect(wrapper.find(IconWrapper)).to.have.lengthOf(1);
  });

});