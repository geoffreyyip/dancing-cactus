import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Header from './Header';

describe('<Header /> smoke tests', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it('should render exactly two <div> child tags', () => {
    const children = wrapper.children();
    expect(children.find('div')).to.have.lengthOf(2);
  });

  it('should render a `.Header-title`', () => {
    expect(wrapper.find('.Header-title')).to.have.lengthOf(1);
  });

  it('should render a `.Header-subtitle`', () => {
    expect(wrapper.find('.Header-subtitle')).to.have.lengthOf(1);
  });

});